import { token } from 'helpers';
import Immutable from "immutable";
import { store } from '../index';

export default () => next => action => {
  if (action.type === "@@query/UPDATE_ENTITIES") {
    const entities = store.getState().get("entities").toJS();
    Object.keys(action.update).forEach((item) => {
      if (Immutable.List.isList(action.update[item]())) {
        if (!entities[item]) {
          entities[item] = [];
        }
        localStorage.setItem(item, JSON.stringify([...entities[item], ...action.update[item]().toJS()]))
      } else {
        localStorage.setItem(item, JSON.stringify({...entities[item], ...action.update[item]().toJS()}))
      }
    });
    return next(action);
  } else {
    return next(action);
  }
};
