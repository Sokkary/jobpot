'use strict';

const HDWalletProvider = require("truffle-hdwallet-provider");

// const Web3 = require("web3");
// const web3 = new Web3();
// const WalletProvider = require("truffle-wallet-provider");
// const Wallet = require('ethereumjs-wallet');

// var ropstenPrivateKey = new Buffer("", "hex")
// var ropstenWallet = Wallet.fromPrivateKey(ropstenPrivateKey);
// var ropstenProvider = new WalletProvider(ropstenWallet, `https://ropsten.infura.io/${process.env.INFURA_API_KEY}`);

module.exports = {
  networks: {
    local: {
      host: 'localhost',
      port: 8545,
      gas: 5000000,
      network_id: '*'
    },

    ganache: {
      host: 'localhost',
      port: 7545,
      gas: 5000000,
      network_id: '*'
    },

    mainnet: {
      network_id: 1,
      gas: 7000000,
      gasPrice: 20000000000, // 20 GWei
      host: process.env.MAINNET_HOST,
      port: process.env.MAINNET_PORT,
      from: process.env.MAINNET_FROM_ADDRESS
    },

    mainnet_infura: {
      network_id: 1,
      gas: 7000000,
      gasPrice: 20000000000, // 20 GWei
      provider: function () {
        return new HDWalletProvider(process.env.WALLET_MNEMONIC, `https://mainnet.infura.io/${process.env.INFURA_API_KEY}`)
      }
    },

    ropsten: {
      network_id: 3,
      gas: 4900000,
      gasPrice: 20000000000, // 20 GWei
      host: process.env.ROPSTEN_HOST,
      port: process.env.ROPSTEN_PORT,
      from: process.env.ROPSTEN_FROM_ADDRESS
    },

    ropsten_infura: {
      network_id: 3,
      gas: 4600000,
      // gasPrice: 20000000000, // 20 GWei
      provider: function() {
        return new HDWalletProvider(process.env.WALLET_MNEMONIC, `https://ropsten.infura.io/${process.env.INFURA_API_KEY}`)
      }
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
