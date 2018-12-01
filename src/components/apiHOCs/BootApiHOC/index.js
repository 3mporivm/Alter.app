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
          wallets: () => Immutable.Map(values.wallets),
        }),
      }, dispatch),
    }),
  ),
  withHandlers({
    getStore: ({ initialStore }) => () => {
      initialStore({
        profile: JSON.parse(localStorage.getItem("profile")),
        wallets: JSON.parse(localStorage.getItem("wallets"))
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getStore();
    }
  })
)(WrappedComponent)

export default BootApiHOC
