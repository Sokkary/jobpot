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
    useTestNet: true,
    network: 'rinkeby',
    local: {
      jobContractAddress: '0x22ee5da06755048df43cebdcc9fc4c6f60e0f8c2',
    },
    rinkeby: {
      jobContractAddress: '0xe30a73f32e11cd554b013b24f98fa97c523a6b3e',
    }
  }
};
