var JobManagementContract = artifacts.require("JobManagementContract");

module.exports = function(deployer) {
  deployer.deploy(JobManagementContract);
};