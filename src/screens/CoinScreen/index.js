import React from 'react';
import PropTypes from 'prop-types';
import { ui, forms, modals, apiHOCs } from 'components';
import {
  compose,
  getContext,
  lifecycle,
  withHandlers,
  withState,
  withStateHandlers,
  withProps,
} from 'recompose';
import { blockchain } from 'helpers';
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';
import { CURRENCY_ICONS } from 'constants/constants';
import net from 'constants/networks';
import iconPlusPurple from 'assets/img/plus_purple.svg';
import iconImport from 'assets/img/import.svg';
import iconPlusWhite from 'assets/img/plus_white.svg';
import iconEnter from 'assets/img/enter.svg';
import bitcore from 'bitcore-lib';
import bchaddrs from 'bchaddrjs';
import Web3 from 'web3';
import './style.scss';

const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/51a62e88a174471781232cf873256f57'));

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
  onImportWallet,
  balance,
  balanceUSD,
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
      icon={CURRENCY_ICONS[currency.name]}
      currency={currency.name.toUpperCase()}
      balanceTop={`${balance ? balance.toFixed(8) : balance}`}
      balanceBottom={`$${balanceUSD ? balanceUSD.toFixed(2) : '0.00'}`}
    />
    <div className="coin-screen-layout__buttons">
      <ui.Buttons.BasicButton
        title="Generate"
        onPress={() => setFooterModalOpen('generate')}
        icon={iconPlusPurple}
        color="purple"
        style={{
          marginRight: 21,
        }}
        styleIcon={{
          padding: 9,
          boxSizing: 'border-box',
        }}
      />
      <ui.Buttons.BasicButton
        title="Import"
        icon={iconImport}
        onPress={() => setFooterModalOpen('import')}
      />
    </div>
    <div className="coin-screen-layout__wallets-title">
      WALLETS
    </div>
    {
      currency.wallets.map(wallet => (
        <ui.Buttons.WalletButton
          key={wallet.address}
          onPress={() => onWallet(wallet)}
          name={wallet.name}
          icon={CURRENCY_ICONS[currency.name]}
          address={wallet.address}
          balance={wallet.balance.toFixed(6) || 0}
          balanceUSD={`$${wallet.currency ? wallet.currency.toFixed(2) : '0.00'}`}
        />
      ))
    }
    <ui.InfoBlock style={{ marginTop: 50 }} />
    <div ref={ref => setDropdownRef(ref)}>
      <modals.Footer
        isHide={isFooterModalOpen === 'generate'}
        icon={iconPlusWhite}
      >
        <forms.NewWalletForm
          onSubmit={onSubmit}
          onCancel={() => setFooterModalOpen(false)}
          isFetching={isFetching}
        />
      </modals.Footer>
      <modals.Footer
        icon={iconEnter}
        isHide={isFooterModalOpen === 'import'}
      >
        <forms.ImportWalletForm
          onSubmit={onImportWallet}
          onCancel={() => !isFetching && setFooterModalOpen(false)}
          isFetching={isFetching}
          currency={currency.name}
        />
      </modals.Footer>
    </div>
    {
      isFooterModalOpen && <div className="header__hide-background"/>
    }
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
  onImportWallet: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
  balanceUSD: PropTypes.number.isRequired,
};

export default compose(
  connect(),

  apiHOCs.WalletsApiHOC(),
  apiHOCs.BootApiHOC(),
  withState('isFetching', 'setIsFetching', false),
  withProps(({ currency }) => ({
    balance: currency.wallets.reduce((accumulator, item) => accumulator + item.balance, 0),
    balanceUSD: currency.wallets.reduce((accumulator, item) => accumulator + item.currency, 0),
  })),
  withStateHandlers(
    { isFooterModalOpen: '' },
    {
      setFooterModalOpen: () => value => ({ isFooterModalOpen: value }),
    },
  ),
  withStateHandlers(
    { dropdownRef: null },
    {
      setDropdownRef: ({ dropdownRef }) => (ref) => {
        if (dropdownRef === null) {
          return ({ dropdownRef: ref });
        }
      },
    },
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
    onWallet: ({ router, currency }) => (wallet) => {
      router.history.push({
        pathname: `/${currency.name}/wallet/${wallet.address}`,
      });
    },
    handleOuterDropdownClick: ({ setFooterModalOpen, dropdownRef, isFetching }) => (e) => {
      if (dropdownRef.contains(e.target)) {
        return;
      }
      !isFetching && setFooterModalOpen(false);
    },
    onSubmit: ({
      addWallet,
      currency,
      profile,
      getBalanceWallet,
      setFooterModalOpen,
      setIsFetching,
      dispatch,
    }) => (values) => {
      setIsFetching(true);
      // alert(profile.get('phrase'));
      const lastWallet = _.findLast(currency.wallets, ({ number }) => number) || { number: 0 };
      const wallet = blockchain.createAddress(currency.name, profile.get('phrase'), lastWallet.number + 1);
      addWallet({ ...wallet, name: values.get('wallet_name') }, currency.name);
      getBalanceWallet(currency.name, wallet.address).then(() => {
        setIsFetching(false);
        // hide modal
        setFooterModalOpen(false);
        dispatch(reset('newWalletForm'));
      });
    },
    onImportWallet: ({
      currency,
      addWallet,
      getBalanceWallet,
      setIsFetching,
      setFooterModalOpen,
    }) => (values) => {
      setIsFetching(true);
      if (values.get('type') === 'Private key') {
        // let privateKey;
        // if (currency.name === 'btc' || currency.name === 'bch')
        //   privateKey = new bitcore.PrivateKey(values.get('privateKey').trim());
        // else
        //   privateKey = new bitcore.PrivateKey(values.get('privateKey').trim(), bitcore.Networks.add(net[currency.name]));
        const privateKey = new bitcore.PrivateKey(values.get('privateKey').trim());
        const publicKey = privateKey.toPublicKey();
        let address;
        if (currency.name === 'bch' || currency.name === 'btc') {
          address = privateKey.toAddress();
        } else if (currency.name === 'eth') {
          console.log(currency.name)
          console.log(`0x${values.get('privateKey').trim()}`)
          address = web3.eth.accounts.privateKeyToAccount(`0x${values.get('privateKey').trim()}`).address;
        } else {
          address = privateKey.toAddress(bitcore.Networks.add(net[currency.name]));
        }
        if (currency.name === 'bch') {
          address = bchaddrs.toCashAddress(address.toString());
        }

        addWallet({
            name: `My wallet ${currency.wallets.length + 1}`,
            address: currency.name === 'eth' ? address : address.toString(),
            publicKey: currency.name === 'eth' ? '' : publicKey.toString(),
            privateKey: values.get('privateKey').trim(),
            balance: 0,
            currency: 0,
          },
          currency.name,
        );
        getBalanceWallet(currency.name, address.toString()).then(() => {
          setIsFetching(false);
          setFooterModalOpen(false);
        });
      }
    },
  }),
  lifecycle({
    componentWillMount() {
      window.localStorage.setItem('lastPath', `/coin/${this.props.currency.name}`);
    },
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
