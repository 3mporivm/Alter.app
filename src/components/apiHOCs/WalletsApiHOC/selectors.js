import { createSelector } from 'reselect';
import { getEntities, getResults } from 'reducers';
import Immutable from 'immutable';
import { denormalize } from "normalizr";
import { course } from 'schemas';

export const getCurrencies = createSelector(
  (state, resultKey) => getEntities(state).get(resultKey, Immutable.List()),
  entities => entities
);

export const getCurrency = createSelector(
  (state, currency) => currency ? getEntities(state).get("currencies", {}).find(({ name }) => name === currency) : {},
  entities => entities
);

export const getWallet = createSelector(
  (state, coin, address) => {
    if (!address) {
      return {};
    }
    console.log()
    let currency = getEntities(state).get("currencies", {}).find(({ name }) => name === coin);
    return {
      coin: currency.name,
      fullName: currency.fullName,
      ...currency.wallets.find((wallet) => wallet.address === address)
    }
  },
  entities => entities
);

export const getCourse = createSelector(
  (state, key) => getResults(state).get(key, Immutable.Map()),
  state => getEntities(state),
  (result, entities) => denormalize(
    result,
    course.courseSchema,
    entities,
  ),
);
