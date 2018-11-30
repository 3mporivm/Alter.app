import { token } from 'helpers';
import { store } from '../index';

export default () => next => action => {
  if (action.type === "@@query/UPDATE_ENTITIES") {
    const entities = store.getState().get("entities").toJS()
    Object.keys(action.update).forEach((item) => {
      // console.log("entities", entities)
      // console.log("action.update[item]().toJS()", action.update[item]().toJS())
      localStorage.setItem(item, JSON.stringify({ ...entities[item], ...action.update[item]().toJS() }))
    });
    return next(action);
  } else {
    return next(action);
  }
};
