import React from 'react';
import PropTypes from 'prop-types';
import {
 compose, getContext, lifecycle, withHandlers, withProps, withState,
} from 'recompose';
import {
 ui, forms, modals, apiHOCs,
} from 'components';
import get from 'lodash/get';
import Immutable from 'immutable';
import { broadcast } from 'helpers';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import iconSendWhite from 'assets/img/send-white.svg';

import './style.scss';

const SendScreen = ({
  onSettings,
  onBack,
  onSend,
  setConfirmationSending,
  confirmationSending,
  currency,
  balance,
  isFetching,
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
      onSubmit={value => setConfirmationSending(value)}
      balance={balance}
      currency={currency.toUpperCase()}
      fee={fee}
    />
    {
      confirmationSending.get('amount') && <div className="header__hide-background" />
    }
    {
      <modals.Footer
        icon={iconSendWhite}
        isHide={!!confirmationSending.get('amount')}
      >
        <ui.ConfirmationSending
          currency={currency}
          onCancel={() => setConfirmationSending(Immutable.Map())}
          onSend={onSend}
          values={confirmationSending}
          fee={fee}
          isFetching={isFetching}
        />
      </modals.Footer>
    }
    <ui.InfoBlock />
  </div>
);

SendScreen.propTypes = {
  onSend: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setConfirmationSending: PropTypes.func.isRequired,
  confirmationSending: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  fee: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  connect(),
  apiHOCs.WalletsApiHOC(),
  apiHOCs.TransactionsApiHOC(),
  withState('confirmationSending', 'setConfirmationSending', Immutable.Map()),
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
    currency: get(location, 'state.currency', '') || window.localStorage.getItem('currency'),
    balance: get(location, 'state.balance', 0) || window.localStorage.getItem('balance'),
    sourceAddress: get(location, 'state.address') || window.localStorage.getItem('address'),
    privateKey: get(location, 'state.privateKey') || window.localStorage.getItem('privateKey'),
  })),
  withHandlers({
    onBack: ({ router }) => () => router.history.goBack(),
    onSettings: ({ router }) => () => router.history.push('/settings'),
    onSend: ({
      getBalanceWallet,
      fee,
      setIsFetching,
      currency,
      confirmationSending,
      sourceAddress,
      privateKey,
      postBroadcast,
      dispatch,
      setFooterModalOpen,
    }) => async () => {
      setIsFetching(true);
      // create rawTx
      let rawTx;
      if (currency !== 'eth') {
        rawTx = await broadcast.createTransaction({
          chain: currency,
          ...confirmationSending.toJS(),
          fee,
          sourceAddress,
        }, privateKey);
      } else {
        rawTx = await broadcast.createTransactionEth({
          chain: currency,
          ...confirmationSending.toJS(),
          fee,
          sourceAddress,
        }, privateKey);
        console.log("rawTx", rawTx)
      }

      // postBroadcast(currency, rawTx).then(() => {
      //   dispatch(reset('sendForm'));
      //   setTimeout(() => getBalanceWallet(currency, sourceAddress), 500);
      //   setFooterModalOpen(Immutable.Map());
      //   setIsFetching(false);
      // });
    },
  }),
  lifecycle({
    componentDidMount() {
      const {
        currency,
        balance,
        sourceAddress,
        privateKey,
      } = this.props;
      window.localStorage.setItem('lastPath', '/send');
      // сохраняем пропы в local storage
      window.localStorage.setItem('currency', currency);
      window.localStorage.setItem('balance', balance);
      window.localStorage.setItem('sourceAddress', sourceAddress);
      window.localStorage.setItem('privateKey', privateKey);
      this.props.getCommission(this.props.currency)
        .then(({ body }) => this.props.setFee(+body.data));
    },
  }),
)(SendScreen);
