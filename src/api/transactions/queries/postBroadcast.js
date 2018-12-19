import endpoints from 'api/endpoints';
import { transactions } from 'schemas';

export default ({ chain, rawTx }) => ({
  url: endpoints.getBroadcastUrl({ chain, rawTx }),
  queryKey: endpoints.getBroadcastUrl({ chain, rawTx }),
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
