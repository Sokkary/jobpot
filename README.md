# Jobpot

Job pot is a honey pot for any referral who refers a successful CV/Cadidate for a job. 
Simply, any job owner can list a job and specify an initial job pot value as a prize for successful referral, after that it will be open for individuals and recruiters to submit CVs. However, submitting a CV will require paying the job pot a small fees to make sure that the submitted CV is genuine and eliminate low quality CVs. 

The fees and initial value all will go into the job pot. The jobpot will keep growing until the job owner selects an applicant as a winner (after singing a contract with the candidate). All jobpot value goes to the winning referral whether a recruiter or individual (may be the applicant himself).

## Live Demo

This demo is deployed on AWS S3 and ***Rinkeby*** test net so to try it, please switch your MetaMask network to Rinkeby.

- App is hosted here: http://jobpot.io.s3-website-ap-southeast-2.amazonaws.com/
- SmartContract (Rinkeby): 0xe30a73f32e11cd554b013b24f98fa97c523a6b3e

Use these sites to get free ETH for Rinkeby network:
- http://rinkeby-faucet.com/ (0.001) ETH
- https://faucet.rinkeby.io/ (3.5) ETH

**Note:** Posting jobs will require ETH equals to the Jobpot prize that you specify yourself in the job submission form. Use less jobpot prizes to not consume all Rinkeby free ethers at once.

## Documents

All conesnsys documentation requirements are located in the folder `/docs` where we've:

- Design patterns
- Secuirty and common attacks
- Library usage
- Stretch goals

## Solution

### Frontend

Web application made by Angular (v6) and web3 for blockchain interactions

### IPFS Storage

IPFS is the main storage where we store job details as JSON document along with any file attachments.

### Smart Contracts

Main smart contract is the `JobContract` which resposible for storing job payment related details along with a document hash points to the IPFS stored document.

## Installation

*Note: Node version > 6.9 is required to be installed

if you run on Linux or MAC, run `. installation.sh` which will automate the insallation process for most of the steps, otherwise follow the following steps one by one.

### Smart Contracts

Rinkeby Contract Address: 0xe30a73f32e11cd554b013b24f98fa97c523a6b3e

Using truffle framework to run and deploy local blockchain by running:

- Install ganache by running `npm i ganache-cli -g`
- Install truffle by running `npm i truffle -g`
- Start the blockchain by running `ganache-cli`, don't forget to copy the displayed accounts and MNemonics to import these accounts into the MetaMask.
- `cd truffle` to move into truffle folder.
- Run `truffle migrate --network local --reset` to deploy the contracts.
- After migrating the contract, copy the migrated JobContract address (displayed on the console) to `/src/environments/environment.ts` and update the configuration property `jobContractAddress: 'JOBCONTRACT_ADDRESS_SHOULD_BE_HERE'` with the new JobContract address.

### Frontend (Angular Web App)

- Run `npm i @angular/cli -g`
- Run `npm i` from **the root project directory**

### Development server

- Run `ng serve` for a dev server. 
- Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Test

- Test cases for the smart contracts are located under `/truffle/test`
- To run the tests, make sure you're inside `/truffle/test` folder and run `truffle test`