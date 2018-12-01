import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { ui } from 'components';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import { required } from 'validators';
import { SALT } from 'constants/constants';
import iconLock from 'assets/img/lock.svg';
import iconSave from 'assets/img/save.svg';
const bcrypt = require('bcryptjs');

import './style.scss';

const ChangePasswordForm = ({
  handleSubmit,
  submit,
  facebookLoginRequest,
  invalid,
  styleForm,
  styleTitle,
  error,
}) => (
  <form onSubmit={handleSubmit(submit)} className="change-password-form-layout">
    <div className="change-password-form">
      <ui.Badge icon={iconLock}/>
      <div className="change-password-form__background">
        <div style={styleTitle} className="change-password-form__title">
          Change Password
        </div>
        <Field
          validate={required}
          component={ui.Fields.BasicField}
          name="oldPassword"
          placeholder="Old password"
          props={{
            inputId: 'oldPassword',
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
          name="newPassword"
          placeholder="New password"
          props={{
            inputId: 'newPassword',
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
      </div>
    </div>
    {
      error &&
      <div className="change-password-form-layout__error">{error}</div>
    }
    <ui.Buttons.BasicButton
      title="Save"
      style={{ marginBottom: 50 }}
      onPress={handleSubmit(submit)}
      isDisabled={invalid}
      color="purple"
      icon={iconSave}
    />
  </form>
);

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

ChangePasswordForm.defaultProps = {
  error: "",
};

export default compose(
  reduxForm({
    form: 'changePasswordForm',
  }),
  withHandlers({
    submit: ({ phrase, onSubmit }) => values => {
      if (values.get('confirmPassword') !== values.get('newPassword')) {
        throw new SubmissionError({
          _error: 'Password does not match the confirm password!',
        });
      } else if (values.get('newPassword') && values.get('newPassword').length < 6) {
        throw new SubmissionError({
          _error: 'Password must have length greater than or equal to 6!',
        });
      } else if (bcrypt.hashSync(values.get('oldPassword'), SALT) !== localStorage.getItem('password')) {
        throw new SubmissionError({
          _error: 'Old password is incorrect!',
        });
      }
      onSubmit(values);
    },
  })
)(ChangePasswordForm);