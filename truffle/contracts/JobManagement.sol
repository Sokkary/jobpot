pragma solidity ^0.4.22;

import "./SafeMath.sol";
import "./JobContract.sol";
import "./JobApplicationContract.sol";

contract JobManagementContract is JobContract, JobApplicationContract {
  using SafeMath for uint;

  function cancelJob(uint jobId) public returns(bool) {
    require(jobs[jobId].owner == msg.sender);
    require(jobs[jobId].status == JobStatus.active);

    jobs[jobId].status = JobStatus.cancelled;

    if (jobApplications[jobId].length == 0) {
      balance = balance.sub(jobs[jobId].initialJobpot);
      msg.sender.transfer(jobs[jobId].initialJobpot);
      return;
    }

    // deduct 25% from owner fees
    uint cancellationFees = 25 * jobs[jobId].initialJobpot / 100;
    msg.sender.transfer(jobs[jobId].initialJobpot - cancellationFees);

    // distribute the owner cancellation fees to the job applications as a compensation
    uint compensationFees = cancellationFees / jobApplications[jobId].length;
    for (uint i = 0; i < jobApplications[jobId].length; i++) {

      // for active applications, return the paid fees + compensation
      if (jobApplications[jobId][i].status == ApplicationStatus.active) {
        compensationFees += jobs[jobId].appFees;
      }

      jobApplications[jobId][i].owner.transfer(compensationFees);
    }

    return true;
  }

  function cancelApplication(uint jobId, uint appId) public returns(bool) {
    require(jobApplications[jobId][appId].owner == msg.sender);
    require(jobs[jobId].status == JobStatus.active);
    require(jobApplications[jobId][appId].status == ApplicationStatus.active);

    jobApplications[jobId][appId].status = ApplicationStatus.cancelled;    

    // deduct 25% from app fees
    uint cancellationFees = jobs[jobId].appFees.mul(25).div(100);
    
    // update jobpot
    jobs[jobId].jobpot = jobs[jobId].jobpot.sub(jobs[jobId].appFees.sub(cancellationFees));

    msg.sender.transfer(jobs[jobId].appFees - cancellationFees);
    
    return true;
  }

  function selectJobApplicationWinner(uint jobId, uint appId) public returns(bool) {
    require(jobs[jobId].owner == msg.sender);
    require(jobs[jobId].status == JobStatus.active);
    require(jobApplications[jobId][appId].status == ApplicationStatus.active);

    jobs[jobId].status = JobStatus.completed;
    jobApplications[jobId][appId].status = ApplicationStatus.winner;
    jobApplications[jobId][appId].owner.transfer(jobs[jobId].jobpot);

    return true;
  }
}
