export const environment = {
  production: true,
  ethNetId: 1524196056249,
  coinPrices: {
    waitToRefetchInSec: 60,
    url: {
      coinPrice: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=AUD,USD,EUR'
    }
  },
  contracts: {
    useTestNet: false,
    network: 'mainnet',
    mainnet: {
      jobContractAddress: '',
    }
  }
};
