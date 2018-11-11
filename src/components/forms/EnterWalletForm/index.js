import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import iconEnter from 'assets/img/enter.svg';
import iconImport from 'assets/img/import.svg';

import { required } from 'validators';

import './style.scss';

const EnterWalletForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="enter-wallet-form-layout">
    <div className="enter-wallet-form">
      <img className="enter-wallet-form__lock" src={iconEnter} alt=""/>
      <div style={styleTitle} className="enter-wallet-form__title">
        Welcome back
      </div>
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="wallet"
        placeholder="Enter wallet seed"
        props={{
          inputId: 'wallet',
          styleWrapper: {
            marginTop: 20,
          },
        }}
      />
      <div className="enter-wallet-form__background"/>
    </div>
    <ui.Buttons.BasicButton
      title="Import Via Seed"
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
      icon={iconImport}
    />
  </form>
);

EnterWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


EnterWalletForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'enterWalletForm',
  }),
)(EnterWalletForm);