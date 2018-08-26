var jobContract = artifacts.require("JobContract");
let catchRevert = require("./exceptions.js").catchRevert;

/**
 * JobContract Related Test Cases
 */
contract('JobContract', function (accounts) {
  var jobC;

  /**
   * Test job creation and retrieval
   */
  describe('Job Creation & Retrieval', () => {

    // Create a job record successfully
    it("should create a job without errors", function () {
      return jobContract.deployed().then(function (instance) {
        jobC = instance;

        return jobC.createJob("ref1", "hash1", 10, 2, {
            from: accounts[0],
            value: 10
          })
          .then(() => jobC.getJobsCount.call())
          .then(count => assert.equal(count, 1, "Job added with new length of 1"))
      });
    });

    // Retrieve job properties by index/id
    it("should return created job props", function () {
      return jobC.getJob.call(0)
        .then(arr => {
          assert.equal(arr[1], "hash1", "docHash expected to be hash1");
          assert.equal(arr[2].toNumber(), 0, "status expected to be active");
          assert.equal(arr[3].toNumber(), 10, "initialJobpot expected to be 10");
          assert.equal(arr[4].toNumber(), 10, "jobpot expected to be 10");
          assert.equal(arr[5].toNumber(), 2, "appFees expected to be 2");
        });
    });

    // Check adding multiple jobs
    it("should increase number of jobs when adding a second jobs", function () {
      return jobC.createJob("ref2", "hash2", 10, 2, {
          from: accounts[0],
          value: 10
        })
        .then(id => jobC.getJobsCount.call())
        .then(count => assert.equal(count, 2, "Number of jobs expected to be 2"));
    });

  });

  /**
   * Test job creation validations
   */
  describe('Job Creation Validations', () => {

    // Validate transfer value against the initialJobpotPrize
    it("should revert when msg.value is not equal to initialJobpotPrize", async () => {
      await catchRevert(jobC.createJob("ref5", "hash5", 10, 2, {
        from: accounts[0],
        value: 5
      }));
    });

    // Validate appFees min value
    it("should revert when appFees is 0", async () => {
      await catchRevert(jobC.createJob("ref5", "hash5", 10, 0, {
        from: accounts[0],
        value: 10
      }));
    });

    // validate min initialJobpotPrize
    it("should revert when initialJobpotPrize is 0", async () => {
      await catchRevert(jobC.createJob("ref5", "hash5", 0, 2, {
        from: accounts[0],
        value: 5
      }));
    });

  });

  /**
   * Test job circuit breaker
   */  
  describe('Job Circuit Breaker', () => {

    // Test activating a circuit breaker
    it("should activate CircuitBreaker by owner only", async () => {
      await jobC.disable({
        from: accounts[0]
      });

      await catchRevert(jobC.disable({
        from: accounts[1]
      }));
    });

    // Test disabling a circuit breaker
    it("should revert job creation when CircuitBreaker is ON", async () => {
      await jobC.disable({
        from: accounts[0]
      });

      await catchRevert(jobC.createJob("ref2", "hash2", 10, 2, {
        from: accounts[0],
        value: 10
      }));
    });

  });

});
