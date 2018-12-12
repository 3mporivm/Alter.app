import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reddit } from 'api'
import { getProfile } from "./selectors";

const BootApiHOC = () => WrappedComponent => compose(
  connect(
    state => ({
      profile: getProfile(state, 'profile'),
    }),
    dispatch => ({
      ...bindActionCreators({}, dispatch),
    }),
  ),
)(WrappedComponent)

export default BootApiHOC
