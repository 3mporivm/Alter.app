import { bindActionCreators } from 'redux';
import { compose, withHandlers } from 'recompose';
import { updateEntities, updateResults } from '@digitalwing.co/redux-query-immutable';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { getEntities, getResults } from 'reducers';
import { normalize } from 'normalizr';
import { deals } from 'schemas';
import { getDeals } from './selectors';

const DealsApiHOC = () => WrappedComponent => compose(
  connect(
    state => ({
      dealsEntities: getEntities(state).get('deals', Immutable.Map()),
      dealsResults: getResults(state).get('deals', Immutable.List()),
      deals: getDeals(state, 'deals'),
    }),
    dispatch => ({
      ...bindActionCreators({
        updateProfile: values => updateEntities({
          profile: (prevProfile = Immutable.Map()) => prevProfile.merge(Immutable.Map(values)),
        }),
        cleanStore: () => updateEntities({
          profile: () => Immutable.Map(),
          currencies: () => Immutable.List(),
          transactions: () => Immutable.List(),
          deals: () => Immutable.Map(),
        }),
        updateDealsEntities: dealsEntities => updateEntities({
          deals: () => dealsEntities,
        }),
        updateDealsResults: dealsResults => updateResults({ deals: dealsResults }),
      }, dispatch),
    }),
  ),
  withHandlers({
    addDeals: ({
      updateDealsEntities,
      updateDealsResults,
      dealsEntities,
      dealsResults,
    }) => (newDeals) => {
      const { entities, result } = normalize(newDeals, deals.dealsSchema);
      updateDealsEntities(dealsEntities.mergeDeep(entities.deals));
      updateDealsResults(dealsResults.push(result));
    },
    deleteDeals: ({
      updateDealsEntities,
      updateDealsResults,
      dealsEntities,
      dealsResults,
    }) => (idDeals) => {
      updateDealsEntities(dealsEntities.filter(dealsItem => (dealsItem.id || dealsItem.get('id')) !== idDeals));
      updateDealsResults(dealsResults.filter(dealsId => dealsId !== idDeals));
    },
  }),
)(WrappedComponent);

export default DealsApiHOC;
