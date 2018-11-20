import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, modals } from 'components';
import iconBitcoin from 'assets/img/bitcoin.svg';
import iconEthereum from 'assets/img/ethereum.svg';
import iconDash from 'assets/img/dash.svg';

import 'assets/screens.scss';
import './style.scss';

const OverviewScreen = ({
  currencies,
  onCoin,
  onSettings,
}) => (
  <div className="wallet-screen-layout">
    <ui.Header
      isDropDown
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      modal={
          <modals.DropDown
            onPress={() => {}}
          />
      }
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
        currencies.map((currency) => (
          <ui.CurrencyCard
            onPress={onCoin}
            name={currency.name}
            fullName={currency.fullName}
            icon={currency.icon}
            backgroundColor={currency.color}
            course={currency.course}
            courseUSD={currency.courseUSD}
            wallets={currency.wallets}
          />
        ))
      }
    </div>
    <ui.InfoBlock/>
  </div>
);

OverviewScreen.propTypes = {
  currencies: PropTypes.array,
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
};

OverviewScreen.defaultProps = {
  currencies: [
    {
      name: "BTC",
      fullName: "Bitcoin",
      icon: iconBitcoin,
      color: "#F7931A",
      course: 1.23567815,
      courseUSD: "6,559.00",
      wallets: 3,
    },
    {
      name: "ETH",
      fullName: "Ethereum",
      icon: iconEthereum,
      color: "#3F4953",
      course: 1.23567815,
      courseUSD: "6,559.00",
      wallets: 3,
    },
    {
      name: "DASH",
      fullName: "Dash",
      icon: iconDash,
      color: "#2573C2",
      course: 1.23567815,
      courseUSD: "6,559.00",
      wallets: 3,
    },
  ],
};

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onCoin: ({ router }) => () => {
      router.history.push({
        pathname: '/coin',
      });
    },
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
  })
)(OverviewScreen);
