const host = 'http://18.219.20.226:7789';

export default {
  getWalletBalanceUrl: ({ chain, address }) => `${host}/balance?chain=${chain}&address=${address}`,
  getTransactionsUrl: ({ chain, address }) => `${host}/txs?chain=${chain}&address=${address}`,
  getUtxosUrl: (chain, address) => `${host}/utxos?chain=${chain}&address=${address}`,
  getBroadcastUrl: () => `${host}/broadcast`,
  getCommissionUrl: ({ chain }) => `http://18.219.20.226:2000/fee/findout?chain=${chain}`,
  getCourseUrl: () => 'https://ccer.empo.io/v1/currency/USD/BTC',
};
