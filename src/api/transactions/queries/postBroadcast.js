import endpoints from 'api/endpoints';
import { transactions } from 'schemas';

export default ({ chain, rawTx }) => ({
  url: endpoints.getBroadcastUrl(),
  queryKey: endpoints.getBroadcastUrl(),
  body: {
    chain,
    rawTx,
  },
  meta: {},
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
    method: 'POST',
  },
  update: {},
});
