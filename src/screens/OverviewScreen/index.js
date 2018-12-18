import React from 'react';
import PropTypes from "prop-types";
import {compose, getContext, lifecycle, withHandlers, withState, withStateHandlers} from "recompose";
import { ThreeBounce } from 'better-react-spinkit';
import { ui, forms, modals, apiHOCs } from 'components';
import { CURRENCY_ICONS } from 'constants/constants';
import './style.scss';

const OverviewScreen = ({
  onCoin,
  onSettings,
  isFetching,
  currenciesSearch,
  searchCurrencies,
}) => (
  <div className="overview-screen-layout">
    <ui.Header
      styleContent={{ zIndex: 1 }}
      //isDropDown
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      //modal={<modals.DropDown onPress={() => {}}/>}
      title="Wallet one"
    />
    <ui.BalanceBlock
      icon={CURRENCY_ICONS.btc}
      backgroundColor="#F7931A"
      currency="TOTAL"
      balance="$26,808.00"
      course="1.23567815 BTC"
    />
    {
      !isFetching &&
      <forms.SearchForm onChange={searchCurrencies}/>
    }
    <div className="overview-screen-layout__currencies">
      {
        isFetching ?
          <div className="overview-screen-layout__currencies__loading-wrapper">
            <ThreeBounce
              scaleStart={0.4}
              scaleEnd={0.7}
              size={25}
              color="rgba(255, 255, 255, .5)"
            />
          </div>
          :
          currenciesSearch.map(({ name, fullName, color, wallets }) => (
            <ui.CurrencyCard
              key={name}
              onPress={() => onCoin(name)}
              name={name.toUpperCase()}
              fullName={fullName}
              icon={CURRENCY_ICONS[name]}
              backgroundColor={color}
              balance={wallets.reduce((accumulator, item) => accumulator + item.balance, 0)}
              balanceUSD={wallets.reduce((accumulator, item) => accumulator + item.currency, 0)}
              wallets={wallets.length}
            />
          ))
      }
    </div>
    <ui.InfoBlock/>
  </div>
);

OverviewScreen.propTypes = {
  currencies: PropTypes.object.isRequired,
  currency: PropTypes.object.isRequired,
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  currenciesSearch: PropTypes.object.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
};

export default compose(
  apiHOCs.WalletsApiHOC(),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onCoin: ({ router }) => (coin) => {
      router.history.push(`/coin/${coin}`);
    },
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
  }),
  withStateHandlers(
    ({ currencies }) => ({ currenciesSearch: currencies }),
    {
      searchCurrencies: (_, { currencies }) => value => {
        if (!(value.get('find_coin') && value.get('find_coin').trim())) {
          return ({ currenciesSearch: currencies });
        }
        const re = new RegExp(value.get('find_coin').trim(), "gi");
        return ({
          currenciesSearch: currencies.filter(({ name, fullName }) => {
            return name.search(re) !== -1 || fullName.search(re) !== -1;
          })
        });
      }
    }
  ),
  withState('isFetching', 'setIsFetching', false),
  lifecycle({
    componentWillMount() {
      // загружаем баланс кошельков, если еще не згружали
      if (!this.props.getBalanceIsFinished) {
        Promise.all(
          (function (props) {
            const promises = [];
            props.currencies.toJS().forEach(({name, wallets}) =>
              wallets.forEach(({address}) => promises.push(props.getBalanceWallet(name, address)))
            );
            return promises;
          }(this.props))
        ).then(() => this.props.setIsFetching(false));
      }
    },
  }),
)(OverviewScreen);
