var JobApplicationContract = artifacts.require("JobApplicationContract");

module.exports = function(deployer) {
  deployer.deploy(JobApplicationContract);
};