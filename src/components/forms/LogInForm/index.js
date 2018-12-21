import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import bcrypt from 'bcryptjs';
import { ui } from 'components';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import { required, minLength } from 'validators';
import { token } from 'helpers';
import iconLock from 'assets/img/lock.svg';
import { SALT } from 'constants/constants';
import { password } from 'helpers';
const minLength3 = minLength(3);

import './style.scss';
//$2a$10$J8GCNLf7N7W85iQGm5fhbuwsPgOqWk9j5JTeGVYD1fsEeM1che3O6
const LogInForm = ({
  handleSubmit,
  submit,
  invalid,
  error,
}) => (
  <form onSubmit={handleSubmit(submit)} className="login-form-layout">
    <div className="login-form">
      <ui.Badge icon={iconLock} />
      <div className="login-form__title">
        Log in
      </div>
      <Field
        validate={[required, minLength3]}
        component={ui.Fields.BasicField}
        name="password"
        placeholder="Password"
        props={{
          inputId: 'password',
          styleWrapper: {
            marginTop: 30,
          },
          isSecurity: true,
        }}
      />
      <div className="login-form__error">{error}</div>
    </div>
    <ui.Buttons.NextButton
      title="Log in"
      onPress={handleSubmit(submit)}
      isDisabled={invalid}
    />
  </form>
);

LogInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

LogInForm.defaultProps = {
  error: "",
};

export default compose(
  reduxForm({
    form: 'logInForm',
  }),
  withHandlers({
    submit: ({ onSubmit }) => values => {
      if (password.get() !== bcrypt.hashSync(values.get('password'), SALT)) {
        throw new SubmissionError({
          _error: 'Wrong password!',
        });
      }
      onSubmit(values);
    },
  })
)(LogInForm);