import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { ui } from 'components';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import { required, minLength, password } from 'validators';
import { token } from 'helpers';
import iconLock from 'assets/img/lock.svg';

import './style.scss';

const ProtectAccountForm = ({
  handleSubmit,
  submit,
  invalid,
  error,
}) => (
  <form onSubmit={handleSubmit(submit)} className="protect-account-form-layout">
    <div className="protect-account-form">
      <ui.Badge icon={iconLock} />
      <div className="protect-account-form__title">
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
      onPress={handleSubmit(submit)}
      isDisabled={invalid}
    />
  </form>
);

ProtectAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

ProtectAccountForm.defaultProps = {
  error: "",
};

export default compose(
  reduxForm({
    form: 'protectAccountForm',
  }),
  withHandlers({
    submit: ({ onSubmit }) => values => {
      if (values.get('confirmPassword') !== values.get('password')) {
        throw new SubmissionError({
          _error: 'Password does not match the confirm password!',
        });
      } else if (values.get('password') && values.get('password').length < 5) {
        throw new SubmissionError({
          _error: 'Password must have length greater than or equal to 6!',
        });
      }
      onSubmit(values);
    },
  })
)(ProtectAccountForm);