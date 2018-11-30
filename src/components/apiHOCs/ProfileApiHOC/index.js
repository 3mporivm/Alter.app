import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import { updateEntities } from '@digitalwing.co/redux-query-immutable';
import { connect } from 'react-redux'
import { reddit } from 'api'

import Immutable from "immutable";

const ProfileApiHOC = () => WrappedComponent => compose(
  connect(
    () => ({}),
    dispatch => ({
      ...bindActionCreators({
        updateProfile: (values) => updateEntities({
          profile: (prevProfile = Immutable.Map()) => prevProfile.merge(Immutable.Map(values)),
        }),
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default ProfileApiHOC
