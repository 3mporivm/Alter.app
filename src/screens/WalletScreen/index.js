import React from 'react';
import PropTypes from "prop-types";
import { ui, forms } from 'components';
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
      currency="BTC"
      balance="1.23567815"
      course="$6,559.00"
    >
      <forms.EditWalletForm
        onSubmit={() => {}}
        initialValues={{
          wallet_name: "My wallet 1",
          btc_address: "3LVGbddKk3uKhqfGKz7X7n63LVGbddKk3uKhqfGKz7X7n6",
          private_key: "3LVGbddKk3uKhqfGKz7X7n63LVGbddKk3uKhqfGKz7X7n6",
          public_key: "3LVGbddKk3uKhqfGKz7X7n63LVGbddKk3uKhqfGKz7X7n6",
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
      date: "2.11.2018",
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
      date: "2.11.2018",
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
      router.history.push('/coin');
    },
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
    onSend: ({ router }) => () => {
      router.history.push({
        pathname: '/send',
      });
    },
    onReceive: ({ router }) => () => {
      router.history.push({
        pathname: '/receive',
      });
    },
  })
)(WalletScreen);
