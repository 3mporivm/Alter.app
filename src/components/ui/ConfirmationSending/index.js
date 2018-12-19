import React from 'react';
import PropTypes from 'prop-types';
import { ui, forms, modals } from 'components';
import iconSend from 'assets/img/send.svg';
import { CURRENCY_ICONS } from 'constants/constants';

import './style.scss';

const ConfirmationSending = ({
  onCancel,
  onSend,
  isFetching,
  values,
  currency,
  fee,
}) => (
  <div className="confirmation_sending">
    <span className="confirmation_sending__title">
      {`Confirmation sending ${currency.toUpperCase()}`}
    </span>
    <div className="confirmation_sending__label">
      Amount
    </div>
    <div className="confirmation_sending__amount-wrapper">
      <div className="confirmation_sending__amount-wrapper__value">{values.get('amount')}</div>
      <img className="confirmation_sending__amount-wrapper__icon" src={CURRENCY_ICONS[currency]} alt="" />
    </div>
    <div className="confirmation_sending__label">
      Fee:
    </div>
    <div className="confirmation_sending__value">
      {fee}
    </div>
    <div className="confirmation_sending__label">
      {`${currency.toUpperCase()} address`}
    </div>
    <div className="confirmation_sending__value">
      {values.get('targetAddress')}
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
  currency: PropTypes.string.isRequired,
  fee: PropTypes.number.isRequired,
};

export default ConfirmationSending;
