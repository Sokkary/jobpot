pragma solidity ^0.4.22;

import "./SafeMath.sol";
import "./JobContract.sol";

contract JobApplicationContract is JobContract {
  using SafeMath for uint;

  enum ApplicationStatus {
    active,
    winner,
    cancelled,
    inDispute
  }

  struct JobApplication {
    uint id;
    uint jobId;
    address owner;
    bytes32 docHash;
    ApplicationStatus status;
  }

  JobApplication[] internal applications;
  mapping(uint => JobApplication[]) internal jobApplications;

  function apply(uint jobId, bytes32 docHash) public payable returns(uint) {
    require(jobs[jobId].status != JobStatus.active);
    require(msg.value >= jobs[jobId].appFees);
    
    uint id = jobs[jobId].numApps++;
    jobApplications[jobId][id].id = id;
    jobApplications[jobId][id].jobId = jobId;
    jobApplications[jobId][id].owner = msg.sender;
    jobApplications[jobId][id].status = ApplicationStatus.active;
    jobApplications[jobId][id].docHash = docHash;
    
    jobs[jobId].jobpot = jobs[jobId].jobpot.add(jobs[jobId].appFees);    

    return id;
  }

  function getJobApplicationsCount(uint jobId) public view returns(uint) {
    return jobApplications[jobId].length;
  }

  function getJobApplications(uint jobId, uint appId) public view returns(uint, int8, address, bytes32) {    
    return ( 
      jobApplications[jobId][appId].jobId, 
      int8(jobApplications[jobId][appId].status),
      jobApplications[jobId][appId].owner, 
      jobApplications[jobId][appId].docHash
    );
  }
}
