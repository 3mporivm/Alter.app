import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconPlus from 'assets/img/plus.svg';
import iconImport from 'assets/img/import.svg';
import { required, minLength } from 'validators';

const minLength6 = minLength(6)

import './style.scss';

const CreateAccountForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
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
        validate={[required, minLength6]}
        component={ui.Fields.CircleField}
        name="your_avatar"
        props={{
          inputId: 'your_avatar',
        }}
      />
      <div className="create-account-form__label">Account address:</div>
      <div className="create-account-form__address">3LVGbddKk3uKhqfGKz7X7n6d5gdg53ds4672</div>
      <div className="create-account-form__background"/>
    </div>
    <ui.Buttons.NextButton
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
      icon={iconImport}
    />
  </form>
);

CreateAccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


CreateAccountForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'createAccountForm',
  }),
)(CreateAccountForm);