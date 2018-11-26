import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { ui } from 'components';
import { Field, reduxForm } from 'redux-form/immutable';

import iconEnterBlue from 'assets/img/enter-blue.svg';

import { required } from 'validators';

import './style.scss';

const ImportWalletForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
  onCancel,
}) => (
  <form onSubmit={handleSubmit} className="import-wallet-form">
    <div style={styleTitle} className="import-wallet-form__title">
      Import wallet
    </div>
    <Field
      validate={required}
      component={ui.Fields.SelectField}
      name="type"
      props={{
        inputId: 'type',
        styleWrapper: {
          marginTop: 30,
        }
      }}
    />
    <div className="import-wallet-form__field-wrapper">
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="wallet_name"
        placeholder="Wallet name"
        props={{
          inputId: 'wallet_name',
          styleWrapper: {
            marginTop: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(26, 39, 78, 0.15)',
            borderBottomStyle: 'solid',
          },
        }}
      />
    </div>
    <span className="import-wallet-form__description">
      Imported accounts will not be associated with your
      keyword phrase created by MetaMask. Learn more about
      importing accounts here.
    </span>
    <div className="import-wallet-form__buttons">
      <ui.Buttons.TransparentButton
        title="Cancel"
        onPress={onCancel}
        style={{
          color: 'black',
          borderColor: 'rgba(26, 39, 78, 0.2)',
          marginRight: 21,
        }}
      />
      <ui.Buttons.BasicButton
        title="Generate"
        color="blue"
        onPress={handleSubmit}
        icon={iconEnterBlue}
        isLoading={isFetching}
        isDisabled={invalid || isFetching}
        style={{ color: '#63CEFF' }}
      />
    </div>
  </form>
);

ImportWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


ImportWalletForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'importWalletForm',
  }),
)(ImportWalletForm);