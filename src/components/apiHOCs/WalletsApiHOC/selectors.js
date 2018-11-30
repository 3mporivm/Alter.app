import { createSelector } from 'reselect';
import { getEntities, getResults } from 'reducers';
import Immutable from 'immutable';

export const getWallets = createSelector(
  (state, resultKey) => getEntities(state).get(resultKey, Immutable.Map()),
  entities => entities
);
