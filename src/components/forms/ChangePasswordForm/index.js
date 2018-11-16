import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import HOCs from '../../HOCs';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { required } from 'validators';
import iconLock from 'assets/img/lock.svg';
import iconSave from 'assets/img/save.svg';

import './style.scss';

const ChangePasswordForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="change-password-form-layout">
    <div className="change-password-form">
      <ui.Badge
        icon={iconLock}
      />
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
    <ui.Buttons.BasicButton
      title="Save"
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={true}
      color="purple"
      icon={iconSave}
    />
  </form>
);

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};



export default compose(
  HOCs.FormErrorsHandlerHOC(),
  reduxForm({
    form: 'changePasswordForm',
  }),
)(ChangePasswordForm);