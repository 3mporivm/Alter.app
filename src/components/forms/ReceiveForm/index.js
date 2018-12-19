import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import QRCode from 'qrcode.react';

import iconReceiveWhite from 'assets/img/receive-white.svg';
import iconReceive from 'assets/img/receive.svg';

import { required } from 'validators';

import './style.scss';

const ReceiveForm = ({
  handleSubmit,
  facebookLoginRequest,
  invalid,
}) => (
  <form onSubmit={handleSubmit} className="receive-form-wrapper">
    <div className="receive-form">
      <ui.Badge
        backgroundColor="#63CEFF"
        icon={iconReceiveWhite}
      />
      <Field
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
          readOnly: true,
        }}
      />
      <div className="receive-form__qr-wrapper">
        <QRCode
          value="http://facebook.github.io/react/"
          bgColor="transparent"
          fgColor="white"
          size={112.5}
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
      isDisabled={invalid}
      style={{ marginTop: 20 }}
    />
  </form>
);

ReceiveForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};


export default compose(
  reduxForm({
    form: 'receiveForm',
  }),
)(ReceiveForm);