import { createSelector } from 'reselect';
import Immutable from "immutable";
import { getEntities } from 'reducers';

export const getProfile = createSelector(
  (state, resultKey) => getEntities(state).get(resultKey, Immutable.Map()),
  entities => entities,
);
