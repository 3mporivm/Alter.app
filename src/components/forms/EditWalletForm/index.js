import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { required } from 'validators';

import './style.scss';

const EditWalletForm = ({
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className="edit-wallet-form">
    <Field
      validate={required}
      component={ui.Fields.BasicField}
      name="wallet_name"
      placeholder="Wallet name"
      props={{
        label: "Wallet name",
        inputId: 'wallet_name',
        styleInput: {
          color: 'rgba(255, 255, 255, 0.8)'
        }
      }}
    />
    <Field
      component={ui.Fields.CopyField}
      name="btc_address"
      props={{
        label: "BTC address",
        inputId: 'btc_address',
        styleWrapper: {
          marginTop: 20,
        }
      }}
    />
    <Field
      component={ui.Fields.CopyField}
      name="private_key"
      props={{
        label: "Private Key",
        inputId: 'private_key',
        styleWrapper: {
          marginTop: 20,
        }
      }}
    />
    <Field
      component={ui.Fields.CopyField}
      name="public_key"
      props={{
        label: "Public Key",
        inputId: 'public_key',
        styleWrapper: {
          marginTop: 20,
        }
      }}
    />
      {
        // handleSubmit
      }
  </form>
);

EditWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


EditWalletForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'editWalletForm',
  }),
)(EditWalletForm);