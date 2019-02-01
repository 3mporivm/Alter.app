import Immutable from 'immutable';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    // Collection
    return Immutable.Map({
      entities: Immutable.Map({
        profile: Immutable.Map(state.profile),
        currencies: Immutable.List(state.currencies),
        deals: Immutable.Map(state.deals),
      }),
      results: Immutable.Map({
        deals: Immutable.List(Object.keys(state.deals).map(key => +key)),
      }),
    });
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error(err);
  }
};
