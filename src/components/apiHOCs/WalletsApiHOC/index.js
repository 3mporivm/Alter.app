import { bindActionCreators } from 'redux';
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { requestAsync, updateEntities, querySelectors } from '@digitalwing.co/redux-query-immutable';
import { wallet, endpoints } from 'api';
import Immutable from "immutable";
import { getCurrency, getCurrencies, getWallet, getCourse } from './selectors'
import _ from "lodash";

const WalletsApiHOC = () => WrappedComponent => compose(
  connect(
    (state, { match }) => ({
      currencies: getCurrencies(state, 'currencies'),
      course: getCourse(state, 'course'),
      currency: getCurrency(state, _.get(match, 'params.name', null)),
      wallet: getWallet(state, _.get(match, 'params.coin', null), _.get(match, 'params.address', null)),
      getBalanceIsFinished: (querySelectors.isFinished(
        state.get('queries'),
        { queryKey: endpoints.getWalletBalanceUrl({}) },
      )),
    }),
    dispatch => ({
      ...bindActionCreators({
        createFirstWallets: (values) => updateEntities({
          currencies: () => Immutable.List(values),
        }),
        addWallet: (wallet, currencyName) => updateEntities({
          currencies: (prevCurrencies = Immutable.List()) => {
            if (prevCurrencies.size === 0) {
              return prevCurrencies;
            }
            const indexCurrencies = prevCurrencies.findIndex(({ name }) => name === currencyName);
            return prevCurrencies.update(indexCurrencies, currencies => ({
              ...currencies,
              wallets: [
                ...currencies.wallets,
                wallet,
              ]
            }))
          }
        }),
        deleteWallet: (address, currencyName) => updateEntities({
          currencies: (prevCurrencies = Immutable.List()) => {
            if (prevCurrencies.size === 0) {
              return prevCurrencies;
            }
            const indexCurrencies = prevCurrencies.findIndex(wallet => wallet.name === currencyName);
            return prevCurrencies.update(indexCurrencies, currencies => {
              const indexWallet = currencies.wallets.findIndex(wallet => wallet.address === address);
              return ({
                ...currencies,
                wallets: [
                  ...currencies.wallets.slice(0, indexWallet),
                  ...currencies.wallets.slice(indexWallet + 1),
                ]
              })
            })
          }
        }),
        getBalanceWallet: (chain, address) => requestAsync(
          wallet.queries.getBalance(({ chain, address })),
        ),
        getCourse: chain => requestAsync(
          wallet.queries.getCourse(({ chain })),
        ),
      }, dispatch),
    }),
  ),
)(WrappedComponent);

export default WalletsApiHOC;
