import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { ui } from 'components';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import bip39 from 'bip39';
import moment from 'moment';

import iconEnter from 'assets/img/enter.svg';
import iconImport from 'assets/img/import.svg';

import { required } from 'validators';

import './style.scss';

const EnterWalletForm = ({
  handleSubmit,
  submit,
  facebookLoginRequest,
  invalid,
  styleForm,
  styleTitle,
  error,
}) => (
  <form onSubmit={handleSubmit(submit)} className="enter-wallet-form-layout">
    <div className="enter-wallet-form">
      <ui.Badge
        icon={iconEnter}
        backgroundColor="#63CEFF"
      />
      <div style={styleTitle} className="enter-wallet-form__title">
        Welcome back
      </div>
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="seed"
        placeholder="Enter wallet seed"
        props={{
          inputId: 'seed',
          styleWrapper: {
            marginTop: 20,
          },
        }}
      />
    </div>
    {
      error &&
      <div className="enter-wallet-form__error">{error}</div>
    }
    <ui.Buttons.BasicButton
      title="Import Via Seed"
      onPress={handleSubmit(submit)}
      isDisabled={invalid}
      icon={iconImport}
    />
  </form>
);

EnterWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.string,
};


EnterWalletForm.defaultProps = {
  error: "",
};


export default compose(
  reduxForm({
    form: 'enterWalletForm',
  }),
  withHandlers({
    submit: ({ phrase, onSubmit }) => values => {
      if (!bip39.validateMnemonic(values.get("seed"))) {
        throw new SubmissionError({
          _error: 'Invalid seed!'
        })
      }
      window.localStorage.setItem('authTime', moment().toISOString());
      onSubmit(values);
    },
  })
)(EnterWalletForm);