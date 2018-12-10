import { bindActionCreators } from 'redux';
import { withHandlers, compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { reddit } from 'api'
import { updateEntities } from "@digitalwing.co/redux-query-immutable/dist/es/index";
import Immutable from "immutable";
import { getProfile } from "./selectors";

const BootApiHOC = () => WrappedComponent => compose(
  connect(
    state => ({
      profile: getProfile(state, 'profile'),
    }),
    dispatch => ({
      ...bindActionCreators({
        initialStore: (values) => updateEntities({
          profile: () => Immutable.Map(values.profile),
          currencies: () => Immutable.List(values.currencies),
        }),
      }, dispatch),
    }),
  ),
  withHandlers({
    getStore: ({ initialStore }) => () => {
      initialStore({
        profile: JSON.parse(localStorage.getItem("profile")),
        currencies: JSON.parse(localStorage.getItem("currencies"))
      });
    },
  }),
  lifecycle({
    componentWillMount() {
      !this.props.profile.get('isRegistered') && this.props.getStore();
    }
  }),
)(WrappedComponent)

export default BootApiHOC
