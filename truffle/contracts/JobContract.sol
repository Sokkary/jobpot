pragma solidity ^0.4.22;

/** @title Ownable Contract */
contract Ownable {
  address owner;

  /** @dev Constructor to set the current contract deployer as an owner */
  constructor() public {
    owner = msg.sender;
  }

  /** @dev Allow to change current owner
  * @param newOwner A replacement of current owner.
   */
  function changeOwner(address newOwner) public onlyOwner {
    owner = newOwner;
  }  

  /** @dev modifier to check the current owner before executing a function when used */
  modifier onlyOwner()
  {
    require(owner == msg.sender);
    _;
  }  
}

/** @title Circuit Breaker Contract */
contract CircuitBreaker is Ownable {
  bool isEnabled = true;

  /** @dev A modifier to check the circuit breaker status before allowing execution of a method */
  modifier whenEnabled()
  {
    require(isEnabled == true);
    _;
  }

  /** @dev Enable the circuit breaker flag*/
  function enable() public onlyOwner {
    isEnabled = true;
  }

  /** @dev Disable the circuit breaker flag*/
  function disable() public onlyOwner {
    isEnabled = false;
  }
}

/** @title Main Job Contract */
contract JobContract is CircuitBreaker {

  enum JobStatus {
    active,
    completed,
    cancelled,
    inDispute
  }

  struct Job {
    uint id;
    address owner;
    bytes32 ref;
    string docHash;
    JobStatus status;
    uint initialJobpot;
    uint jobpot;
    uint appFees;
    uint numApps;
  }

  uint private index;
  uint internal balance;
  Job[] internal jobs;

  /** @dev Notify a creation of a job */
  event JobCreated(bytes32 indexed ref, string docHash, uint initialJobpotPrize, uint appFees);
  
  /** @dev Creates a job record.
  * @param ref External record reference to identify the job record.
  * @param docHash IPFS external record hash.
  * @param initialJobpotPrize The initial prize offered by job creator.
  * @param appFees The minimum application fees when someone submits/refer a candidate for the job.
  * @return new job ID
  */
  function createJob(bytes32 ref, string docHash, uint initialJobpotPrize, uint appFees) 
    public 
    payable 
    whenEnabled
    returns(uint)
  {
    require(initialJobpotPrize > 0 && appFees > 0 && msg.value >= initialJobpotPrize);

    uint id = index++;

    Job memory job = Job(id, msg.sender, ref, docHash, JobStatus.active, initialJobpotPrize, initialJobpotPrize, appFees, 0);

    jobs.push(job);

    emit JobCreated(ref, docHash, initialJobpotPrize, appFees);
    
    return id;
  }

  /** @dev Returns count of current jobs.
  * @return totalJobsCount The current number of jobs.
  */
  function getJobsCount() public view returns(uint totalJobsCount) {
    return index;
  }

  /** @dev Returns count of current jobs.
  * @param id The ID of a job record to return, ID is equal to current job index.
  * @return ref Reference to an external job record data.
  * @return docHash The IPFS reference attached with the job that contains full job details.
  * @return status The current job status (0=active, 1=completed, 2=cancelled, 3=inDispute).
  * @return initialJobpot The initial jobpot prize posted by job owner.
  * @return jobpot The accomulative jobpot prize (inititalJobPot + (number of job applications * appFees)).
  * @return appFees The min app fees to submit/refer a candidate for a posted job.
  */
  function getJob(uint id) public view returns(bytes32, string, int8, uint, uint, uint) {
    return ( jobs[id].ref, jobs[id].docHash, int8(jobs[id].status), jobs[id].initialJobpot, jobs[id].jobpot, jobs[id].appFees);
  }
}
