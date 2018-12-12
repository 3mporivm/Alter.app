import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, lifecycle, withHandlers, withState } from "recompose";
import { ThreeBounce } from 'better-react-spinkit';
import { ui, forms, modals, apiHOCs } from 'components';
import { CURRENCY_ICONS } from 'constants/constants';
import iconBitcoin from 'assets/img/bitcoin.svg';
import iconEthereum from 'assets/img/ethereum.svg';
import iconDash from 'assets/img/dash.svg';

import 'assets/screens.scss';
import './style.scss';

const OverviewScreen = ({
  currencies,
  onCoin,
  onSettings,
  isFetching,
  currency,
}) => (
  <div className="wallet-screen-layout">
    {
      console.log("re-render")
    }
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
      icon={iconBitcoin}
      backgroundColor="#F7931A"
      currency="TOTAL"
      balance="$26,808.00"
      course="1.23567815 BTC"
    />
    <forms.SearchForm
      onChange={(value) => console.log(value.get('find_coin'))}
    />
    <div className="wallet-screen-layout__currencies">
      {
        isFetching ?
          <div className="wallet-screen-layout__currencies__loading-wrapper">
            <ThreeBounce
              scaleStart={0.4}
              scaleEnd={0.7}
              size={25}
              color="rgba(255, 255, 255, .5)"
            />
          </div>
          :
          currencies.map((currency) => (
            <ui.CurrencyCard
              key={currency.name}
              onPress={() => onCoin(currency.name)}
              name={currency.name.toUpperCase()}
              fullName={currency.fullName}
              icon={currency.icon}
              backgroundColor={currency.color}
              balance={currency.wallets.reduce((accumulator, item) => accumulator + item.balance, 0)}
              courseUSD={"default" || currency.courseUSD}
              wallets={currency.wallets.length}
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
  withState('isFetching', 'setIsFetching', false),
  lifecycle({
    componentWillMount() {
      // загружаем баланс кошельков
      Promise.all(
        (function (props) {
          const promises = [];
          props.currencies.toJS().forEach(({name, wallets}) =>
            wallets.forEach(({address}) => promises.push(props.getBalanceWallet(name, address)))
          );
          return promises;
        }(this.props))
      ).then(() => this.props.setIsFetching(false));
    },
  }),
)(OverviewScreen);
