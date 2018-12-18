import { createSelector } from 'reselect';
import { getEntities, getResults } from 'reducers';
import Immutable from 'immutable';
import { denormalize } from 'normalizr';
import { transactions } from 'schemas';

export const getTransactions = createSelector(
  (state, key) => getResults(state).get(key, Immutable.List()),
  state => getEntities(state),
  (result, entities) => denormalize(
    result,
    transactions.arrayOfTransactionsSchemas,
    entities,
  ),
);
