import React from 'react';
import PropTypes from "prop-types";
import { ui, forms, apiHOCs } from 'components';
import { withState, compose, getContext, withHandlers } from "recompose";

import iconBitcoin from 'assets/img/bitcoin.svg';
import iconReceive from 'assets/img/receive.svg';
import iconSend from 'assets/img/send.svg';

import 'assets/screens.scss';
import './style.scss';

const WalletScreen = ({
  onBack,
  onSettings,
  onSend,
  onReceive,
  transactions,
  wallet,
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
      onPress={() => {}}
      icon={iconBitcoin}
      backgroundColor="#F7931A"
      currency={wallet.coin.toUpperCase()}
      balance={wallet.balance}
      course="$6,559.00"
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
        transactions.map(transaction => (
          <ui.Transaction
            key={transaction.date}
            type={transaction.type}
            address={transaction.address}
            sum={transaction.sum}
            date={transaction.date}
          />
        ))
      }
    </div>
    <ui.InfoBlock style={{ marginTop: 50 }}/>
  </div>
);

WalletScreen.propTypes = {
  transactions: PropTypes.array,
  onBack: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  onReceive: PropTypes.func.isRequired,
};

WalletScreen.defaultProps = {
  transactions: [
    {
      type: "Received",
      address: "3LVGbdd3LVGbdd3LVGbdd3LVGbddE832y",
      sum: 2.23371815,
      date: "5.11.2018",
    },
    {
      type: "Sent",
      address: "3LVGbdd3LVGbdd 3LVG bdd3LVG bddE832y",
      sum: 2.23371815,
      date: "2.11.2018",
    },
    {
      type: "Received",
      address: "3LVGbdd…E832y",
      sum: 2.23371815,
      date: "7.11.2018",
    },
  ],
};

export default compose(
  apiHOCs.WalletsApiHOC(),
  withState('isFooterModalOpen', 'setFooterModalOpen', false),
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
      router.history.push({
        pathname: '/settings',
      });
    },
    onSend: ({ router, wallet }) => () => {
      router.history.push({
        pathname: '/send',
        state: {
          currency: wallet.coin,
          balance: wallet.balance,
        },
      });
    },
    onReceive: ({ router, wallet }) => () => {
      router.history.push({
        pathname: '/receive',
        state: {
          currency: wallet.coin,
        },
      });
    },
  })
)(WalletScreen);
