import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import iconSendWhite from 'assets/img/send-white.svg';
import iconSend from 'assets/img/send.svg';

import { required } from 'validators';

import './style.scss';

const SendForm = ({
  handleSubmit,
  isFetching,
  invalid,
  balance,
  currency,
  fee,
}) => (
  <form onSubmit={handleSubmit} className="send-form-wrapper">
    <div className="send-form">
      <ui.Badge icon={iconSendWhite} />
      <div className="send-form__title">
        {`Balance: ${balance}`}
      </div>
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="amount"
        props={{
          inputId: 'amount',
          styleWrapper: {
            height: 65,
            marginTop: 20,
          },
          styleInput: {
            fontSize: 34,
            lineHeight: '22px',
            color: '#ffffff',
            fontFamily: 'ProximaNova-Bold',
          },
          label: 'Amount',
        }}
      />
      <div className="send-form__fee">
        <span className="send-form__fee__left">
          Estimated fee: <span className="send-form__fee__left-fee">{fee}</span>
        </span>
      </div>
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="targetAddress"
        placeholder={`${currency} address`}
        props={{
          inputId: 'targetAddress',
          styleWrapper: {
            marginTop: 20,
          },
        }}
      />
    </div>
    <ui.Buttons.BasicButton
      title="Send"
      color="purple"
      icon={iconSend}
      onPress={handleSubmit}
      isLoading={isFetching}
      //isDisabled={invalid || isFetching}
      style={{ marginTop: 20 }}
    />
  </form>
);

SendForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  balance: PropTypes.number.isRequired,
  fee: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
};

export default compose(
  reduxForm({
    form: 'sendForm',
  }),
)(SendForm);