import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import iconReceiveWhite from 'assets/img/receive-white.svg';
import iconReceive from 'assets/img/receive.svg';
import iconQR from 'assets/img/qr.png';

import { required } from 'validators';

import './style.scss';

const ReceiveForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
}) => (
  <form onSubmit={handleSubmit} className="receive-form-wrapper">
    <div className="receive-form">
      <ui.Badge
        backgroundColor="#63CEFF"
        icon={iconReceiveWhite}
      />
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
            lineHeight: "22px",
            color: '#ffffff',
            fontFamily: 'ProximaNova-Bold'
          },
          label: 'Amount',
        }}
      />
      <div className="receive-form__qr-wrapper">
        <img
          className="receive-form__qr"
          src={iconQR}
          alt=""
        />
      </div>
      <Field
        component={ui.Fields.CopyField}
        name="code"
        props={{
          inputId: 'code',
          label: 'Copy this code',
          readOnly: true,
        }}
      />
    </div>
    <ui.Buttons.BasicButton
      title="Receive"
      icon={iconReceive}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
      style={{ marginTop: 20 }}
    />
  </form>
);

ReceiveForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


ReceiveForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'receiveForm',
  }),
)(ReceiveForm);