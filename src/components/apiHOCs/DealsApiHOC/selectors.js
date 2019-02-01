import { createSelector } from 'reselect';
import { getEntities, getResults } from 'reducers';
import Immutable from 'immutable';
import { denormalize } from 'normalizr';
import { deals as dealsSchemas } from 'schemas';

export const getDeals = createSelector(
  (state, resultKey) => getResults(state).get(resultKey, Immutable.List()),
  state => getEntities(state),
  (result, entities) => denormalize(
    result,
    dealsSchemas.arrayOfDealsSchemas,
    entities,
  ),
);
