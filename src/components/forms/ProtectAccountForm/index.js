import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconLock from 'assets/img/lock.svg';
import { required } from 'validators';

import './style.scss';

const ProtectAccountForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="protect-account-form-layout">
    <div className="protect-account-form">
      <ui.Badge
        icon={iconLock}
      />
      <div className="protect-account-form__background">
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
          name="confirm_password"
          placeholder="Confirm password"
          props={{
            inputId: 'confirmPassword',
            isSecurity: true,
          }}
        />
      </div>
    </div>
    <ui.Buttons.NextButton
      title="Continue"
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
    />
  </form>
);

ProtectAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


ProtectAccountForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'protectAccountForm',
  }),
)(ProtectAccountForm);