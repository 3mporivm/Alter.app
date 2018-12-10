import React from 'react';
import PropTypes from "prop-types";
import { ui, forms, modals, apiHOCs } from 'components';
import {compose, getContext, lifecycle, withHandlers, withStateHandlers} from "recompose";
import iconBitcoin from 'assets/img/bitcoin.svg';
import iconPlusPurple from 'assets/img/plus_purple.svg';
import iconImport from 'assets/img/import.svg';
import iconPlusWhite from 'assets/img/plus_white.svg';
import iconEnter from 'assets/img/enter.svg';

import 'assets/screens.scss';
import './style.scss';

const CoinScreen = ({
  wallets,
  setFooterModalOpen,
  isFooterModalOpen,
  onBack,
  onSettings,
  onWallet,
  setDropdownRef,
  currency,
}) => (
  <div className="coin-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={currency.name.toUpperCase()}
    />
    <ui.BalanceBlock
      icon={iconBitcoin}
      backgroundColor="#F7931A"
      currency={currency.name.toUpperCase()}
      balance={currency.wallets.reduce((accumulator, item) => accumulator + item.balance, 0)}
      course="$default"
    />
    <div className="coin-screen-layout__buttons">
      <ui.Buttons.BasicButton
        title="Generate"
        onPress={() => setFooterModalOpen("generate")}
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
        onPress={() => setFooterModalOpen("import")}
      />
    </div>
    <div className="coin-screen-layout__wallets-title">
      WALLETS
    </div>
    {
      currency.wallets.map(wallet => (
        <ui.Buttons.WalletButton
          onPress={() => onWallet(wallet.address)}
          name={currency.name.toUpperCase()}
          icon={iconBitcoin}
          backgroundColor="#F7931A"
          address={wallet.address}
          balance={wallet.balance}
          balanceUSD={wallet.balanceUSD || 'default'}
        />
      ))
    }
    <ui.InfoBlock style={{ marginTop: 50 }}/>
    {
      isFooterModalOpen && <div className="header__hide-background"/>
    }
    <div ref={ref => setDropdownRef(ref)}>
    <modals.Footer
      icon={iconPlusWhite }
      style={{ bottom: isFooterModalOpen === "generate" ? 0 : -500 }}
    >
      <forms.NewWalletForm
        onCancel={() => setFooterModalOpen(false)}
        isFetching={false}
      />
    </modals.Footer>
    <modals.Footer
      icon={iconEnter}
      style={{ bottom: isFooterModalOpen === "import" ? 0 : -500 }}
      backgroundColor="#63CEFF"
    >
      <forms.ImportWalletForm
        onCancel={() => setFooterModalOpen(false)}
        isFetching={false}
      />
    </modals.Footer>
    </div>
  </div>
);

CoinScreen.propTypes = {
  wallets: PropTypes.array,
  currency: PropTypes.object.isRequired,
  setFooterModalOpen: PropTypes.func.isRequired,
  isFooterModalOpen: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onWallet: PropTypes.func.isRequired,
  setDropdownRef: PropTypes.func.isRequired,
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
  apiHOCs.WalletsApiHOC(),
  withStateHandlers(
    { isFooterModalOpen: false },
    {
      setFooterModalOpen: () => value => ({ isFooterModalOpen: value })
    }
  ),
  withStateHandlers(
    { dropdownRef: null },
    {
      setDropdownRef: ({ dropdownRef }) => ref => {
        if (dropdownRef === null) {
          return ({ dropdownRef: ref })
        }
      }
    }
  ),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onBack: ({ router }) => () => router.history.goBack(),
    onSettings: ({ router }) => () => {
      router.history.push({ pathname: '/settings' });
    },
    onWallet: ({ router, currency }) => (address) => {
      router.history.push(`/${currency.name}/wallet/${address}`);
    },
    handleOuterDropdownClick: ({ setFooterModalOpen, dropdownRef }) => (e) => {
      if (dropdownRef.contains(e.target)) {
        return;
      }
      setFooterModalOpen(false);
    },
  }),
  lifecycle({
    componentDidMount() {
      const { handleOuterDropdownClick } = this.props;
      document.addEventListener('mousedown', handleOuterDropdownClick, false);
    },
    componentWillUnmount() {
      const { handleOuterDropdownClick } = this.props;
      document.addEventListener('mousedown', handleOuterDropdownClick, false);
    },
  }),
)(CoinScreen);
