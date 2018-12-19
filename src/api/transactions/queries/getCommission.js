import endpoints from 'api/endpoints';
import { transactions } from 'schemas';

export default ({ chain }) => ({
  url: endpoints.getCommissionUrl({ chain }),
  queryKey: endpoints.getCommissionUrl({ chain }),
  meta: {},
  force: true,
  options: {
    headers: {
      Accept: 'application/json',
    },
  },
  update: {},
});
