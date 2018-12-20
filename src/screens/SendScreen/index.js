import React from 'react';
import PropTypes from "prop-types";
import {compose, getContext, lifecycle, withHandlers, withProps, withState} from "recompose";
import { ui, forms, modals, apiHOCs } from 'components';
import Immutable from 'immutable';
import { broadcast } from 'helpers';
import { connect } from "react-redux";
import { reset } from 'redux-form';
import iconSendWhite from 'assets/img/send-white.svg';

import './style.scss';

const SendScreen = ({
  currencies,
  onCoin,
  onSettings,
  onBack,
  onSend,
  setFooterModalOpen,
  confirmationSending,
  currency,
  balance,
  fee,
}) => (
  <div className="send-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={`Send ${currency.toUpperCase()}`}
    />
    <forms.SendForm
      onSubmit={(value) => setFooterModalOpen(value)}
      balance={balance}
      currency={currency.toUpperCase()}
      fee={fee}
    />
    {
      confirmationSending.get('amount') && <div className="header__hide-background"/>
    }
    {
      <modals.Footer
        icon={iconSendWhite}
        isHide={confirmationSending.get('amount')}
      >
        <ui.ConfirmationSending
          currency={currency}
          onCancel={() => setFooterModalOpen(Immutable.Map())}
          onSend={onSend}
          values={confirmationSending}
          fee={fee}
        />
      </modals.Footer>
    }
    <ui.InfoBlock/>
  </div>
);

SendScreen.propTypes = {
  onSend: PropTypes.func.isRequired,
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setFooterModalOpen: PropTypes.func.isRequired,
  isFooterModalOpen: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  fee: PropTypes.number.isRequired,
};

export default compose(
  connect(),
  apiHOCs.TransactionsApiHOC(),
  withState('confirmationSending', 'setFooterModalOpen', Immutable.Map()),
  withState('isFetching', 'setIsFetching', false),
  withState('fee', 'setFee', 0),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withProps(({ location }) => ({
    currency: _.get(location, 'state.currency', ''),
    balance: _.get(location, 'state.balance', 0),
    sourceAddress: _.get(location, 'state.address'),
    privateKey: _.get(location, 'state.privateKey'),
  })),
  withHandlers({
    onBack: ({ router }) => () => router.history.goBack(),
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
    onSend: ({ fee, setIsFetching, currency, confirmationSending, sourceAddress, privateKey, postBroadcast, dispatch }) => async () => {
      setIsFetching(true);
      // create rawTx
      const rawTx = await broadcast.createTransaction({
        chain: currency,
        ...confirmationSending.toJS(),
        fee,
        sourceAddress,
      }, privateKey);
      console.log("rawTx", rawTx)
      dispatch(reset('sendForm'));
      // send money
      // postBroadcast(currency, rawTx).then(({ body }) => {
      //   console.log(body);
      //   setIsFetching(false);
      // });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.getCommission(this.props.currency)
        .then(({ body }) => this.props.setFee(body.data));
    }
  }),
)(SendScreen);
