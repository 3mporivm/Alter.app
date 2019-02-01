import React from 'react';
import PropTypes from 'prop-types';
import { ui } from 'components';
import iconEmpo from 'assets/img/iconEmpo.svg';
import { CURRENCY_ICONS } from 'constants/constants';

import './style.scss';

const TransactionSignature = ({
  onCancel,
  onConfirm,
  deal,
}) => (
  <div className="transaction-signature">
    <div className="transaction-signature__title">
      {'Подпись транзакции на'}
      <img
        className="transaction-signature__icon-emporium"
        src={iconEmpo}
        alt="icon Emporium.ai"
      />
      {'Emporium.ai, '}
      {`сделки #${deal.id} с пользователем`}
      <span className="transaction-signature__username">
        {deal.userName}
      </span>
    </div>
    <span className="transaction-signature__sub-title">
      Я отдаю:
    </span>
    <div className="transaction-signature__amount-wrapper">
      <div className="transaction-signature__amount-wrapper__value">{deal.amountSell}</div>
      <img
        className="transaction-signature__amount-wrapper__icon"
        src={CURRENCY_ICONS[deal.currencySell]}
        alt=""
      />
    </div>
    <span className="transaction-signature__sub-title">
      {`С ${deal.currencySell.toUpperCase()} кошелька:`}
    </span>
    <div className="transaction-signature__description">
      {deal.fromTheWallet}
    </div>
    <span className="transaction-signature__sub-title">
      Я получаю:
    </span>
    <div className="transaction-signature__amount-wrapper">
      <div className="transaction-signature__amount-wrapper__value">{deal.amountBuy}</div>
      <img
        className="transaction-signature__amount-wrapper__icon"
        src={CURRENCY_ICONS[deal.currencyBuy]}
        alt=""
      />
    </div>
    <span className="transaction-signature__sub-title">
      {`На ${deal.currencyBuy.toUpperCase()} кошелек:`}
    </span>
    <div className="transaction-signature__description">
      {deal.forWallet}
    </div>
    <span className="transaction-signature__sub-title">
      Fee:
    </span>
    <div className="transaction-signature__description">
      {deal.fee}
    </div>
    <span className="transaction-signature__sub-title">
      {deal.paymentId}
    </span>
    <div className="transaction-signature__description">
      Prepayment for design and development
    </div>
    <div className="transaction-signature__buttons">
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

TransactionSignature.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  deal: PropTypes.object.isRequired,
};

export default TransactionSignature;
