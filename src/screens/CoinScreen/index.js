import React from 'react';
import PropTypes from "prop-types";
import { ui, forms, modals } from 'components';
import { withState, compose, getContext, withHandlers } from "recompose";
import iconBitcoin from 'assets/img/bitcoin.svg';
import iconPlusPurple from 'assets/img/plus_purple.svg';
import iconImport from 'assets/img/import.svg';
import iconPlusWhite from 'assets/img/plus_white.svg';

import 'assets/screens.scss';
import './style.scss';

const CoinScreen = ({
  wallets,
  setFooterModalOpen,
  isFooterModalOpen,
  onBack,
  onSettings,
}) => (
  <div className="coin-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title="BTC"
    />
    <ui.BalanceBlock
      icon={iconBitcoin}
      backgroundColor="#F7931A"
      currency="BTC"
      balance="1.23567815"
      course="$6,559.00"
    />
    <div className="coin-screen-layout__buttons">
      <ui.Buttons.BasicButton
        title="Generate"
        onPress={() => setFooterModalOpen(!isFooterModalOpen)}
        icon={iconPlusPurple}
        color="purple"
        style={{
          marginRight: 21,
        }}
        styleIcon={{
          padding: 9,
          boxSizing: 'border-box'
        }}
      />
      <ui.Buttons.BasicButton
        title="Import"
        icon={iconImport}
        onPress={() => {}}
      />
    </div>
    <div className="coin-screen-layout__wallets-title">
      WALLETS
    </div>
    {
      wallets.map(wallet => (
        <ui.Buttons.WalletButton
          name={wallet.name}
          icon={iconBitcoin}
          backgroundColor="#F7931A"
          fullName={wallet.fullName}
          balance={wallet.balance}
          balanceUSD={wallet.balanceUSD}
        />
      ))
    }
    <ui.InfoBlock style={{ marginTop: 50 }}/>
    {
      <modals.Footer
        icon={iconPlusWhite}
        style={{ bottom: isFooterModalOpen ? 0 : -500 }}
      >
        <forms.NewWalletForm
          onCancel={() => setFooterModalOpen(false)}
        />
      </modals.Footer>
    }
  </div>
);

CoinScreen.propTypes = {
  wallets: PropTypes.array,
  setFooterModalOpen: PropTypes.func.isRequired,
  isFooterModalOpen: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
};

CoinScreen.defaultProps = {
  wallets: [
    {
      name: "My Wallet 1",
      fullName: "3LVGbdd3LVGbdd3LVGbdd3LVGbddE832y",
      balance: 2.23371815,
      balanceUSD: "$3,223.00",
    },
    {
      name: "My Wallet 2",
      fullName: "3LVGbdd3LVGbdd 3LVG bdd3LVG bddE832y",
      balance: 2.23371815,
      balanceUSD: "$3,223.00",
    },
    {
      name: "My Wallet 3",
      fullName: "3LVGbdd…E832y",
      balance: 2.23371815,
      balanceUSD: "$3,223.00",
    },
  ],
};


export default compose(
  withState('isFooterModalOpen', 'setFooterModalOpen', false),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onBack: ({ router }) => () => {
      router.history.push('/overview');
    },
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
  })
)(CoinScreen);
