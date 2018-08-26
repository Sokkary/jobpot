import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Store } from '@ngrx/store';
import { OperationFailedAction, OperationSuccededAction, NavigateAction } from '@app/_state/actions/common.action';
import { IpfsService } from '@app/services/ipfs.service';
import { JobEthService } from '@app/services/job-eth.service';
import { AlertService } from '@app/services/alert.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {

  form = new FormGroup({});
  categories = [
    {
      label: 'Accounting',
      value: 'accounting'
    },
    {
      label: 'Programming',
      value: 'programming'
    },
    {
      label: 'Design',
      value: 'design'
    },
    {
      label: 'Other',
      value: 'other'
    }
  ];

  types = [
    {
      label: 'Full time',
      value: 'fulltime'
    },
    {
      label: 'Part time',
      value: 'partime'
    },
    {
      label: 'Contract',
      value: 'contract'
    },
    {
      label: 'Other',
      value: 'Other'
    }
  ];

  model: any = {};
  fields: FormlyFieldConfig[] = [];
  jobId: string;
  nodeIsReady: boolean;
  ipfsHash: string;
  lastFile = {};
  isLoading = false;
  isValidOwner = false;
  ethUsdPrice = 0;

  constructor(
    private store: Store<any>,
    private ipfs: IpfsService,
    private jobEth: JobEthService,
    private alert: AlertService
  ) {
    ipfs.onNodeReady.subscribe(isReady => this.nodeIsReady = isReady);
    ipfs.onFileAdded.subscribe(file => this.lastFile = file);
    jobEth.account.subscribe(account => this.isValidOwner = jobEth.isValidOwner());
  }

  async ngOnInit() {
    // this.ethUsdPrice = (await this.coinPrice.getCoinPrice())['ETH'].USD;
    this.fields = [
      {
        key: 'title',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Title',
          placeholder: 'GoLang Developer',
          size: 100,
          required: true,
        },
        validators: {
          validation: ['alpha'],
        },
      },
      {
        key: 'category',
        type: 'select',
        templateOptions: {
          label: 'Category',
          options: this.categories,
          required: true
        }
      },
      {
        key: 'type',
        type: 'select',
        templateOptions: {
          label: 'Type',
          options: this.types,
          required: true
        }
      },
      {
        key: 'company',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'Company',
          placeholder: 'Ex: ABC Company',
          required: true,
        }
      },
      {
        key: 'initialJobpotPrize',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Initital Jobpot Prize (ETH)',
          placeholder: 'Ex: 0.5',
          required: true,
        }
      },
      {
        key: 'appFees',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Application Fees (ETH)',
          placeholder: 'Ex: 0.001',
          required: true,
        }
      },
      {
        key: 'startDate',
        type: 'input',
        templateOptions: {
          type: 'date',
          label: 'Start Date',
          required: true,
        }
      },
      {
        key: 'endDate',
        type: 'input',
        templateOptions: {
          type: 'date',
          label: 'End Date',
          required: false,
        }
      },
      {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          type: 'text',
          label: 'Short Description',
          placeholder: 'Ex: job details and required skills.',
          required: true,
          rows: 3
        }
      }
    ];
  }

  submit() {
    if (this.form.valid && this.jobEth.isValidOwner()) {
      this.isLoading = true;
      if (this.ipfs.fileIsUploading) {
        this.ipfs.onFileUploadEnd.subscribe(files => this.saveRecord(files.ipfsFile.hash));
        return;
      }

      this.saveRecord(null);
    }
  }

  async saveRecord(ipfsHash): Promise<any | void> {
    this.model.createdBy = this.jobEth.getOwnerAccount();
    this.model.ref = (Date.now() + (Math.random() * 1000000)).toString();
    this.model.createdAt = new Date().toLocaleDateString();
    this.model.attachment = ipfsHash;
    const docHash = await this.ipfs.uploadJSON(this.model);

    this.jobEth.createJob(Object.assign(this.model, { docHash }))
      .then(() => {
        this.isLoading = false;
        this.alert.success('Job has been posted successfully', 'Job Post Successful');
        this.store.dispatch(new NavigateAction({ url: ['/home'] }));
      })
      .catch(err => this.jobEth.handleError(err));
  }

  onFileAdded(file) {
    console.log('onFileAdded: ', file);

    const reader = new FileReader();

    reader.onloadend = () => {
      this.ipfs.fileCount++;
      const fileObj = {
        index: this.ipfs.fileCount,
        name: file.name,
        type: file.type,
        size: file.size,
        progress: 0,
        lastModified: file.lastModified,
        uploadedAt: (new Date()).getTime(),
        status: 'uploaded',
        signers: {},
        creator: {
          email: '',
          ETHAddress: ''
        },
        routes: {},
      };
      this.ipfs.onFileAdded.next(fileObj);
      this.ipfs.queue(reader.result, fileObj);
    };

    reader.readAsArrayBuffer(file);
  }
}
