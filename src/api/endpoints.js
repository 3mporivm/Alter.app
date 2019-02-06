const host = 'http://18.219.20.226:7789';
const kovan = 'http://api-kovan.etherscan.io';

export default {
  getWalletBalanceUrl: ({ chain, address }) => `${host}/balance?chain=${chain}&address=${address}`,
  getTransactionsUrl: ({ chain, address }) => `${host}/txs?chain=${chain}&address=${address}`,
  getTransactionsEtxUrl: ({ address }) => `${kovan}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=XRGUN6D2CI8P5SZ8K8KIWZAQRIP85HZGS5`,
  getUtxosUrl: (chain, address) => `${host}/utxos?chain=${chain}&address=${address}`,
  getBroadcastUrl: () => `${host}/broadcast`,
  getCommissionUrl: ({ chain }) => `http://18.219.20.226:2000/fee/findout?chain=${chain}`,
  getCourseUrl: () => 'https://ccer.empo.io/v1/currency/USD/BTC',
};
