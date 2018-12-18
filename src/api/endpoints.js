const host = 'http://18.219.20.226:7789';

export default {
  getWalletBalanceUrl: ({ chain, address }) => `${host}/balance?chain=${chain}&address=${address}`,
  getTransactionsUrl: ({ chain, address }) => `${host}/txs?chain=${chain}&address=${address}`,
};
