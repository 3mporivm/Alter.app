import React from 'react';
import PropTypes from 'prop-types';
import { ui, forms, modals } from 'components';
import iconSend from 'assets/img/send.svg';

import './style.scss';

const ConfirmationSending = ({
  onCancel,
  onSend,
  isFetching,
  values,
  iconCurrency,
}) => (
  <div className="confirmation_sending">
    <span className="confirmation_sending__title">
      Confirmation sending BTC
    </span>
    <div className="confirmation_sending__label">
      Amount
    </div>
    <div className="confirmation_sending__amount-wrapper">
      <div className="confirmation_sending__amount-wrapper__value">{values.get('amount')}</div>
      <div className="confirmation_sending__amount-wrapper__icon-wrapper">
        <img className="confirmation_sending__amount-wrapper__icon" src={iconCurrency} alt="" />
      </div>
    </div>
    <div className="confirmation_sending__label">
      Fee:
    </div>
    <div className="confirmation_sending__value">
      {values.get('fee')}
    </div>
    <div className="confirmation_sending__label">
      BTC address
    </div>
    <div className="confirmation_sending__value">
      {values.get('BTC_address')}
    </div>
    <div className="confirmation_sending__label">
      Payment ID
    </div>
    <div className="confirmation_sending__value">
      {values.get('payment_id')}
    </div>
    <div className="confirmation_sending__buttons">
      <ui.Buttons.TransparentButton
        title="Cancel"
        onPress={onCancel}
        style={{
          color: 'black',
          borderColor: 'rgba(26, 39, 78, 0.15)',
          marginRight: 21,
        }}
      />
      <ui.Buttons.BasicButton
        title="Send"
        color="purple"
        onPress={onSend}
        icon={iconSend}
        isLoading={isFetching}
        isDisabled={isFetching}
        style={{ color: '#B076FF' }}
      />
    </div>
  </div>
);

ConfirmationSending.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  values: PropTypes.object.isRequired,
  iconCurrency: PropTypes.any.isRequired,
};

export default ConfirmationSending;
