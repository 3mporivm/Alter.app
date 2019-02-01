import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { updateEntities } from '@digitalwing.co/redux-query-immutable';
import { connect } from 'react-redux';
import Immutable from 'immutable';

const ProfileApiHOC = () => WrappedComponent => compose(
  connect(
    () => ({}),
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
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default ProfileApiHOC;
