import React from 'react';
import PropTypes from 'prop-types';
import { ui, forms, apiHOCs } from 'components';
import {
  withState,
  compose,
  getContext,
  withHandlers,
  lifecycle,
} from 'recompose';
import { ThreeBounce } from 'better-react-spinkit';
import moment from 'moment';
import { CURRENCY_ICONS } from 'constants/constants';

import iconReceive from 'assets/img/receive.svg';
import iconSend from 'assets/img/send.svg';

import './style.scss';

const WalletScreen = ({
  onBack,
  onSettings,
  onSend,
  onReceive,
  onDeleteWallet,
  transactions,
  wallet,
  getTransactionsIsFetching,
}) => (
  <div className="wallet-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={wallet.name}
    />
    <ui.BalanceBlock
      onPress={onDeleteWallet}
      icon={CURRENCY_ICONS[wallet.coin]}
      backgroundColor="#F7931A"
      currency={wallet.coin.toUpperCase()}
      balanceTop={`${wallet.balance.toFixed(8)}`}
      balanceBottom={`$${wallet.currency ? wallet.currency.toFixed(2) : '0.00'}`}
    >
      <forms.EditWalletForm
        onSubmit={() => {}}
        currency={wallet.coin.toUpperCase()}
        initialValues={{
          wallet_name: wallet.name,
          address: wallet.address,
          private_key: wallet.privateKey,
          public_key: wallet.publicKey,
        }}
      />
    </ui.BalanceBlock>
    <div className="wallet-screen-layout__buttons">
      <ui.Buttons.BasicButton
        title="Send"
        icon={iconSend}
        color="purple"
        style={{ marginRight: 21 }}
        onPress={onSend}
        //isDisabled={wallet.balance === 0}
      />
      <ui.Buttons.BasicButton
        title="Receive"
        icon={iconReceive}
        onPress={onReceive}
      />
    </div>
    <div className="wallet-screen-layout__transactions-title">
      TRANSACTIONS
    </div>
    <div className="wallet-screen-layout__transactions">
      {
        getTransactionsIsFetching ?
          <div className="wallet-screen-layout__transactions__loading-wrapper">
            <ThreeBounce
              scaleStart={0.4}
              scaleEnd={0.7}
              size={25}
              color="rgba(255, 255, 255, .5)"
            />
          </div>
          :
          transactions.toJS().map(transaction => (
            <ui.Transaction
              key={transaction.hash}
              type={transaction.value > 0 ? 'Received' : 'Sent'}
              hash={transaction.hash}
              amount={(transaction.value > 0
                ? transaction.value.toString()
                : transaction.value.toString().slice(1))
              }
              date={moment(transaction.time * 1000).format('DD.MM.YYYY')}
            />
          ))
      }
      {
        !getTransactionsIsFetching && transactions.size === 0 &&
        <div className="wallet-screen-layout__transactions__empty">Transaction history is empty</div>
      }
    </div>
    <ui.InfoBlock style={{ marginTop: 50 }} />
  </div>
);

WalletScreen.propTypes = {
  wallet: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onReceive: PropTypes.func.isRequired,
  onDeleteWallet: PropTypes.func.isRequired,
  getTransactionsIsFetching: PropTypes.bool,
};

WalletScreen.defaultProps = {
  getTransactionsIsFetching: false,
};

export default compose(
  apiHOCs.WalletsApiHOC(),
  apiHOCs.TransactionsApiHOC(),
  withState('isFooterModalOpen', 'setFooterModalOpen', false),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onDeleteWallet: ({ router, deleteWallet, wallet }) => () => {
      deleteWallet(wallet.address, wallet.coin);
      router.history.goBack();
    },
    onBack: ({ router }) => () => router.history.goBack(),
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
    onSend: ({ router, wallet }) => () => {
      console.log('wallet.balance', wallet.balance);
      router.history.push({
        pathname: '/send',
        state: {
          currency: wallet.coin,
          balance: wallet.balance,
          address: wallet.address,
          privateKey: wallet.privateKey,
        },
      });
    },
    onReceive: ({ router, wallet }) => () => {
      router.history.push({
        pathname: '/receive',
        state: {
          wallet,
        },
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { coin, address } = this.props.wallet;
      window.localStorage.setItem('lastPath', `/${coin}/wallet/${address}`);

      if (coin !== 'eth') {
        this.props.getTransactions(coin, address);
      } else {
        this.props.getTransactionsEtx(address);
      }
    },
  }),
)(WalletScreen);
