// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ethNetId: 1524196056249,
  coinPrices: {
    waitToRefetchInSec: 60,
    url: {
      coinPrice: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=AUD,USD,EUR'
    }
  },
  contracts: {
    useTestNet: true,
    network: 'rinkeby',
    local: {
      jobContractAddress: '0xe30a73f32e11cd554b013b24f98fa97c523a6b3e',
    },
    rinkeby: {
      jobContractAddress: '0xe30a73f32e11cd554b013b24f98fa97c523a6b3e',
    }
  }
};
