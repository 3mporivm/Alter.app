import React from 'react';
import PropTypes from "prop-types";
import { ui, forms, apiHOCs } from 'components';
import { withState, compose, getContext, withHandlers, withProps, lifecycle } from "recompose";
import { ThreeBounce } from 'better-react-spinkit';
import { CURRENCY_ICONS } from 'constants/constants';

import iconReceive from 'assets/img/receive.svg';
import iconSend from 'assets/img/send.svg';

import 'assets/screens.scss';
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
      title="My wallet 1"
    />
    <ui.BalanceBlock
      onPress={onDeleteWallet}
      icon={CURRENCY_ICONS[wallet.currencyName]}
      backgroundColor="#F7931A"
      currency={wallet.currencyName.toUpperCase()}
      balance={wallet.balance}
      course="$6,559.00"
    >
      <forms.EditWalletForm
        onSubmit={() => {}}
        currency={wallet.currencyName.toUpperCase()}
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
        style={{
          marginRight: 21,
        }}
        onPress={onSend}
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
          transactions.map(transaction => (
            <ui.Transaction
              key={transaction.get('hash')}
              type={transaction.get('value') > 0 ? 'Received' : 'Sent'}
              hash={transaction.get('hash')}
              amount={(transaction.get('value') > 0 ? transaction.get('value').toString() : transaction.get('value').toString().slice(1))}
              date={transaction.date || 'date'}
            />
          ))
      }
      {
        !getTransactionsIsFetching && transactions.size === 0 &&
        <div className="wallet-screen-layout__transactions__empty">Transaction history is empty</div>
      }
    </div>
    <ui.InfoBlock style={{ marginTop: 50 }}/>
  </div>
);

WalletScreen.propTypes = {
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
  apiHOCs.TransactionsApiHOC(),
  withState('isFooterModalOpen', 'setFooterModalOpen', false),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withProps(({ location }) => ({
    wallet: _.get(location, 'state.wallet'),
  })),
  withHandlers({
    onDeleteWallet: ({ router }) => () => {
      router.history.goBack();
    },
    onBack: ({ router }) => () => router.history.goBack(),
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
    onSend: ({ router, wallet }) => () => {
      router.history.push({
        pathname: '/send',
        state: {
          currency: wallet.currencyName,
          balance: wallet.balance,
        },
      });
    },
    onReceive: ({ router, wallet }) => () => {
      router.history.push({
        pathname: '/receive',
        state: {
          currency: wallet.currencyName,
        },
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { wallet } = this.props;
      this.props.getTransactions(wallet.currencyName, wallet.address);
    },
  }),
)(WalletScreen);
