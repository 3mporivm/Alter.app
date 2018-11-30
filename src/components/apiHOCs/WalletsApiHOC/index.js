import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import { updateEntities } from '@digitalwing.co/redux-query-immutable';
import { connect } from 'react-redux'
import Immutable from "immutable";
import { getWallets } from './selectors'

const WalletsApiHOC = () => WrappedComponent => compose(
  connect(
    state => ({
      wallets: getWallets(state, 'wallets'),
    }),
    dispatch => ({
      ...bindActionCreators({
        createFirstWallets: (values) => updateEntities({
          wallets: (prevWallets = Immutable.Map()) => prevWallets.merge(Immutable.Map(values)),
        }),
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default WalletsApiHOC;
