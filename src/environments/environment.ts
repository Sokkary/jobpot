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
    network: 'local',
    local: {
      jobContractAddress: '0x22ee5da06755048df43cebdcc9fc4c6f60e0f8c2',
    },
    ropsten: {
      jobContractAddress: '',
    }
  }
};
