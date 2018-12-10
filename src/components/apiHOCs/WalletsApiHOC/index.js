import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { requestAsync, updateEntities } from '@digitalwing.co/redux-query-immutable';
import { wallet } from 'api';
import Immutable from "immutable";
import { getCurrency, getCurrencies, getWallet } from './selectors'

const WalletsApiHOC = () => WrappedComponent => compose(
  connect(
    (state, { match }) => ({
      currencies: getCurrencies(state, 'currencies'),
      currency: getCurrency(state, _.get(match, 'params.name', null)),
      wallet: getWallet(state, _.get(match, 'params.coin', null), _.get(match, 'params.address', null)),
    }),
    dispatch => ({
      ...bindActionCreators({
        createFirstWallets: (values) => updateEntities({
          currencies: () => Immutable.List(values),
        }),
        getBalanceWallet: (chain, address) => requestAsync(
          wallet.queries.getBalance(({ chain, address })),
        ),
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default WalletsApiHOC;
