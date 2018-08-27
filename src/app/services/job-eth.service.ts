import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '@environment/environment';
import { EthService } from '@canyaio/canpay-lib';
import { OperationFailedAction } from '@app/_state/actions/common.action';
import { jobContract } from '@app/contracts';
import { IpfsService } from '@app/services/ipfs.service';

const JobStatus = {
  0: 'active',
  1: 'completed',
  2: 'cancelled'
};

@Injectable()
export class JobEthService extends EthService {
  private jobContract: any;
  private jobContractAddress = environment.contracts[environment.contracts.network].jobContractAddress;

  constructor(
    private store: Store<any>,
    private ipfs: IpfsService
  ) {
    super();
    this.initContract();
  }

  private initContract(abi = jobContract.abi, address = this.jobContractAddress) {
    return this.jobContract = this.createContractInstance(abi, address);
  }

  createJob(job, from = this.getOwnerAccount()): Promise<boolean> {
    if (!this.isValidAddress(from)) {
      return Promise.reject(this.handleError({ message: 'Invalid owner address, check your MetaMask configuration!' }));
    }

    console.log('job: ', job);

    const initialJobpotPrize = this.web3js.utils.toWei(job.initialJobpotPrize + '', 'ether');
    const appFees = this.web3js.utils.toWei(job.appFees + '', 'ether');

    const functionSignature = this.jobContract.methods.createJob(
      this.web3js.utils.fromAscii(job.ref),
      this.web3js.utils.fromAscii(job.docHash),
      initialJobpotPrize,
      appFees
    ).encodeABI();

    return this.web3js.eth.estimateGas({
      from, to: this.jobContractAddress,
      value: initialJobpotPrize,
      data: functionSignature
    })
      .then(gas => {
        const txOptions = { from, ...this.getDefaultGasParams(), gas: gas + 10000, value: initialJobpotPrize };
        return this.jobContract.methods.createJob(
          this.web3js.utils.fromAscii(job.ref),
          this.web3js.utils.fromAscii(job.docHash),
          initialJobpotPrize,
          appFees
        )
          .send(txOptions)
          .then(tx => this.getTransactionReceiptMined(tx.transactionHash))
          .then(tx => {
            console.log('tx: ', tx);
            if (!tx.status) {
              throw new Error('Transaction did not complete successfully');
            }
          });
      });
  }

  getEthJobs(status = 'active') {
    if (!this.jobContract) {
      return Promise.resolve([]);
    }

    return this.jobContract.methods.getJobsCount()
      .call()
      .then(count => {
        const jobs = [];

        console.log('jobsCount: ', count);

        for (let i = 0; i < count; i++) {
          jobs.push(this.jobContract.methods.getJob(i).call());
        }

        return Promise.all(jobs);
        // .then(jobsList => jobsList.filter(record => record[] === true));
      });
  }

  isValidAddress(address = this.getOwnerAccount()) {
    return this.web3js.utils.isAddress(address);
  }

  isValidOwner() {
    if (!this.isValidAddress()) {
      this.handleError({ message: 'Invalid owner account. Please, check your MetaMask account configuration.' });
      return false;
    }

    return true;
  }

  handleError(err) {
    this.store.dispatch(new OperationFailedAction({ error: { message: err.message } }));
    return err.message;
  }

  /**
  * Data converters
  */

  // return (int8(jobs[id].status), jobs[id].docHash, jobs[id].initialJobpot, jobs[id].jobpot, jobs[id].appFees);
  ethJobArrToObject(arr) {
    console.log('arr: ', arr);
    return {
      ref: this.web3js.utils.hexToAscii(arr[0]),
      docHash: arr[1] ? this.web3js.utils.hexToAscii(arr[1]) : '',
      status: JobStatus[arr[2]],
      initialJobpot: this.web3js.utils.fromWei(arr[3], 'ether'),
      jobpot: this.web3js.utils.fromWei(arr[4], 'ether'),
      appFees: this.web3js.utils.fromWei(arr[5], 'ether')
    };
  }

  getJobs() {
    let jsonEthJobs;
    return this.getEthJobs()
      .then(ethJobs => ethJobs.map(ethJob => this.ethJobArrToObject(ethJob)))
      .then(_jsonEthJobs => jsonEthJobs = _jsonEthJobs)
      .then(() => Promise.all(jsonEthJobs.map(jsonEthJob => this.ipfs.getJSON(jsonEthJob.docHash))))
      .then(ipfsDocs => {
        return ipfsDocs.map((doc: string) => {
          const job = JSON.parse(doc);
          job.attachment = job.attachment ? `https://gateway.ipfs.io/ipfs/${job.attachment}` : undefined;
          job.ethJob = jsonEthJobs.find(j => parseFloat(job.ref) === parseFloat(j.ref)) || {};
          return job;
        });
      });
  }

  getJob(ref) {
    return this.getJobs()
      .then(jobs => jobs.find(j => parseFloat(ref) === parseFloat(j.ref)) || {});
  }

  getMyJobs() {
    const owner = this.getOwnerAccount();
    return this.getJobs()
      .then(jobs => jobs.filter(j => j.createdBy === owner) || {});
  }

}
