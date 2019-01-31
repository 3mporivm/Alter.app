import endpoints from 'api/endpoints';
import { normalize } from 'normalizr';
import { transactions } from 'schemas';

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/51a62e88a174471781232cf873256f57'));

export default ({ address }) => ({
  url: endpoints.getTransactionsEtxUrl({ address }),
  transform: response => normalize(
    response.result.map(transaction => ({
      ...transaction,
      time: transaction.timeStamp,
      value: web3.utils.fromWei(transaction.value),
    })),
    transactions.arrayOfTransactionsSchemas).entities,
  transformResult: response => ({
    transactions: normalize(response.result, transactions.arrayOfTransactionsSchemas).result,
  }),
  queryKey: 'getTransactions',
  meta: {},
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  update: {
    transactions: (_, result) => result,
  },
  updateResult: {
    transactions: (prevResult, result) => result,
  },
});
