import endpoints from 'api/endpoints';
import { normalize } from 'normalizr';
import { transactions } from 'schemas';

export default ({ chain, address }) => ({
  url: endpoints.getTransactionsUrl({ chain, address }),
  transform: response => normalize(response.txs, transactions.arrayOfTransactionsSchemas).entities,
  transformResult: response => ({
    transactions: normalize(response.txs, transactions.arrayOfTransactionsSchemas).result,
  }),
  queryKey: endpoints.getTransactionsUrl({}),
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
