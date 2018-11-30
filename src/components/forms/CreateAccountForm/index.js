import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconPlus from 'assets/img/plus.svg';
import iconImport from 'assets/img/import.svg';
import { required } from 'validators';

import './style.scss';

const CreateAccountForm = ({
  handleSubmit,
  facebookLoginRequest,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="create-account-form-layout">
    <div className="create-account-form">
      <ui.Badge icon={iconPlus} />
      <div style={styleTitle} className="enter-wallet-form__title">
        Create New Account
      </div>
      <div className="create-account-form__label">Choose your avatar:</div>
      <Field
        validate={required}
        component={ui.Fields.AvatarField}
        name="avatar"
        props={{
          inputId: 'avatar',
        }}
      />
    </div>
    <ui.Buttons.NextButton
      onPress={handleSubmit}
      isDisabled={invalid}
      icon={iconImport}
    />
  </form>
);

CreateAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'createAccountForm',
  }),
)(CreateAccountForm);