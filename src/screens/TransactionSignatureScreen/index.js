import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  withHandlers,
  withState,
} from 'recompose';
import { ui, apiHOCs } from 'components';
import { withRouter } from 'react-router-dom';
import logoDark from 'assets/img/logo-dark.svg';
import iconEmpo from 'assets/img/iconEmpo.svg';
import { CURRENCY_ICONS } from 'constants/constants';

import './style.scss';

const TransactionSignatureScreen = ({
  deal,
  onCancel,
  onConfirm,
}) => (
  <div className="transaction-signature-layout">
    <div className="transaction-signature-layout__logo">
      <img
        src={logoDark}
        alt="logo"
        className="transaction-signature-layout__logo__img"
      />
      <span className="transaction-signature-layout__logo__bold-text">
        alter
      </span>
      <span className="transaction-signature-layout__logo__text">
        app
      </span>
    </div>
    <div className="transaction-signature-layout__title">
      {'Подпись транзакции на'}
      <img
        className="transaction-signature-layout__icon-emporium"
        src={iconEmpo}
        alt="icon Emporium.ai"
      />
      {'Emporium.ai, '}
      {`сделки #${deal.id} с пользователем`}
      <span className="transaction-signature-layout__username">
        {deal.userName}
      </span>
    </div>
    <span className="transaction-signature-layout__sub-title">
      Я отдаю:
    </span>
    <div className="transaction-signature-layout__amount-wrapper">
      <div className="transaction-signature-layout__amount-wrapper__value">{deal.amountSell}</div>
      <img
        className="transaction-signature-layout__amount-wrapper__icon"
        src={CURRENCY_ICONS[deal.currencySell]}
        alt=""
      />
    </div>
    <span className="transaction-signature-layout__sub-title">
      {`С ${deal.currencySell.toUpperCase()} кошелька:`}
    </span>
    <div className="transaction-signature-layout__description">
      {deal.fromTheWallet}
    </div>
    <span className="transaction-signature-layout__sub-title">
      Я получаю:
    </span>
    <div className="transaction-signature-layout__amount-wrapper">
      <div className="transaction-signature-layout__amount-wrapper__value">{deal.amountBuy}</div>
      <img
        className="transaction-signature-layout__amount-wrapper__icon"
        src={CURRENCY_ICONS[deal.currencyBuy]}
        alt=""
      />
    </div>
    <span className="transaction-signature-layout__sub-title">
      {`На ${deal.currencyBuy.toUpperCase()} кошелек:`}
    </span>
    <div className="transaction-signature-layout__description">
      {deal.forWallet}
    </div>
    <span className="transaction-signature-layout__sub-title">
      Fee:
    </span>
    <div className="transaction-signature-layout__description">
      {deal.fee}
    </div>
    <span className="transaction-signature-layout__sub-title">
      {deal.paymentId}
    </span>
    <div className="transaction-signature-layout__description">
      Prepayment for design and development
    </div>
    <div className="transaction-signature-layout__buttons">
      <ui.Buttons.TransparentButton
        title="Отмена"
        onPress={onCancel}
        style={{
          color: 'black',
          borderColor: 'rgba(26, 39, 78, 0.2)',
          marginRight: 20,
        }}
      />
      <ui.Buttons.BasicButton
        title="Подтвердить"
        color="purple"
        onPress={onConfirm}
        //isLoading={isFetching}
        //isDisabled={isFetching}
        style={{ color: '#B076FF' }}
      />
    </div>
  </div>
);

TransactionSignatureScreen.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  deal: PropTypes.object.isRequired,
};

export default compose(
  apiHOCs.DealsApiHOC(),
  withRouter,
  withState('deal', 'setDeal', {
    currencySell: '',
    currencyBuy: '',
  }),
  withHandlers({
    onCancel: ({ deal, deleteDeals }) => () => {
      // удаление сделки из store
      deleteDeals(deal.id);
      setTimeout(() => window.close(), 1000);
      window.close();
    },
    onConfirm: ({ deal, deleteDeals }) => () => {
      // удаление сделки из store
      deleteDeals(deal.id);
      setTimeout(() => window.close(), 1000);
    },
  }),
  lifecycle({
    componentWillMount() {
      const deal = localStorage.getItem('deal');
      this.props.setDeal(JSON.parse(deal));
      this.props.addDeals(JSON.parse(deal));
      localStorage.removeItem('isNewWindow');
    },
  }),
)(TransactionSignatureScreen);
