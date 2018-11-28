import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { ui, HOCs } from 'components';
import { Field, reduxForm } from 'redux-form/immutable';
import { required, minLength, password } from 'validators';
import { token } from 'helpers';
import iconLock from 'assets/img/lock.svg';


import './style.scss';

const ProtectAccountForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
  error,
}) => (
  <form onSubmit={handleSubmit} className="protect-account-form-layout">
    <div className="protect-account-form">
      <ui.Badge icon={iconLock} />
      <div style={styleTitle} className="protect-account-form__title">
        Protect Your Account
      </div>
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="password"
        placeholder="Create a password"
        props={{
            inputId: 'createPassword',
            styleWrapper: {
              marginBottom: 20,
              marginTop: 30,
            },
            isSecurity: true,
          }}
      />
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="confirmPassword"
        placeholder="Confirm password"
        props={{
            inputId: 'confirmPassword',
            isSecurity: true,
          }}
      />
      <div className="protect-account-form__error">{error}</div>
    </div>
    <ui.Buttons.NextButton
      title="Continue"
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
    />
  </form>
);

ProtectAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};


ProtectAccountForm.defaultProps = {
};


export default compose(
  HOCs.FormErrorsHandlerHOC(),
  reduxForm({
    form: 'protectAccountForm',
  }),
)(ProtectAccountForm);