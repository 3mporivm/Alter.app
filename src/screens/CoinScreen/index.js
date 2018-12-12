import React from 'react';
import PropTypes from "prop-types";
import { ui, forms, modals, apiHOCs } from 'components';
import {compose, getContext, lifecycle, withHandlers, withState, withStateHandlers} from "recompose";
import { blockchain } from 'helpers';
import iconBitcoin from 'assets/img/bitcoin.svg';
import iconPlusPurple from 'assets/img/plus_purple.svg';
import iconImport from 'assets/img/import.svg';
import iconPlusWhite from 'assets/img/plus_white.svg';
import iconEnter from 'assets/img/enter.svg';

import 'assets/screens.scss';
import './style.scss';

const CoinScreen = ({
  setFooterModalOpen,
  isFooterModalOpen,
  onBack,
  onSettings,
  onWallet,
  setDropdownRef,
  currency,
  onSubmit,
  isFetching,
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
          name={wallet.name}
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
        onSubmit={onSubmit}
        onCancel={() => setFooterModalOpen(false)}
        isFetching={isFetching}
      />
    </modals.Footer>
    <modals.Footer
      icon={iconEnter}
      style={{ bottom: isFooterModalOpen === "import" ? 0 : -500 }}
      backgroundColor="#63CEFF"
    >
      <forms.ImportWalletForm
        onCancel={() => !isFetching && setFooterModalOpen(false)}
        isFetching={isFetching}
      />
    </modals.Footer>
    </div>
  </div>
);

CoinScreen.propTypes = {
  currency: PropTypes.object.isRequired,
  setFooterModalOpen: PropTypes.func.isRequired,
  isFooterModalOpen: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onWallet: PropTypes.func.isRequired,
  setDropdownRef: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  apiHOCs.WalletsApiHOC(),
  apiHOCs.ProfileApiHOC(),
  withState('isFetching', 'setIsFetching', false),
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
    onSettings: ({ router }) => () => router.history.push('/settings'),
    onWallet: ({ router, currency }) => (address) => {
      router.history.push(`/${currency.name}/wallet/${address}`);
    },
    handleOuterDropdownClick: ({ setFooterModalOpen, dropdownRef, isFetching }) => (e) => {
      if (dropdownRef.contains(e.target)) {
        return;
      }
      !isFetching && setFooterModalOpen(false);
    },
    onSubmit: ({ addWallet, currency, profile, getBalanceWallet, setFooterModalOpen, setIsFetching }) => values => {
      setIsFetching(true);
      const wallet = blockchain.createAddress(currency.name, profile, currency.wallets.length + 1);
      addWallet({ ...wallet, name: values.get('wallet_name') }, currency.name);
      getBalanceWallet(currency.name, wallet.address).then(() => {
        setIsFetching(false);
        // hide modal
        setFooterModalOpen(false);
      });
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
