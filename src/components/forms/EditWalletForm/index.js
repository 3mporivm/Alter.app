import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import { required } from 'validators';

import './style.scss';

const EditWalletForm = ({
  handleSubmit,
  currency,
  initialValues,
}) => (
  <form onSubmit={handleSubmit} className="edit-wallet-form">
    <Field
      validate={required}
      component={ui.Fields.BasicField}
      name="wallet_name"
      placeholder="Wallet name"
      props={{
        label: 'Wallet name',
        inputId: 'wallet_name',
        styleInput: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      }}
    />
    <Field
      component={ui.Fields.CopyField}
      name="address"
      props={{
        label: `${currency.toUpperCase()} address`,
        inputId: 'address',
        styleWrapper: {
          marginTop: 20,
        },
      }}
    />
    <Field
      component={ui.Fields.CopyField}
      name="private_key"
      props={{
        label: 'Private Key',
        inputId: 'private_key',
        styleWrapper: {
          marginTop: 20,
        },
      }}
    />
    {
      initialValues.get('public_key') && (
        <Field
          component={ui.Fields.CopyField}
          name="public_key"
          props={{
            label: 'Public Key',
            inputId: 'public_key',
            styleWrapper: {
              marginTop: 20,
            },
          }}
        />
      )
    }
  </form>
);

EditWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
};

export default compose(
  reduxForm({
    form: 'editWalletForm',
  }),
)(EditWalletForm);