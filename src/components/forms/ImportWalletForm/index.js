import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { ui } from 'components';
import {Field, reduxForm, formValueSelector, SubmissionError} from 'redux-form/immutable';
import { connect } from "react-redux";
import bitcore from "bitcore-lib";
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
  type,
  error,
  submit,
}) => (
  <form onSubmit={handleSubmit(submit)} className="import-wallet-form">
    <div style={styleTitle} className="import-wallet-form__title">
      Import wallet
    </div>
    <Field
      component={ui.Fields.SelectField}
      name="type"
      placeholder="Select type"
      props={{
        inputId: 'type',
        styleWrapper: {
          marginTop: 30,
        },
        options: [
          "Private key",
          //"JSON file",
        ]
      }}
    />
    {
      type === "JSON file" &&
      <Field
        component={ui.Fields.FileField}
        name="file"
        props={{
          inputId: 'file',
          label: 'JSON file:',
          result: 'File not found',
          styleWrapper: {
            marginTop: 20,
          }
        }}
      />
    }
    <div className="import-wallet-form__field-wrapper">
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name={type === "JSON file" ? "jsonFile" : "privateKey"}
        placeholder={type === "JSON file" ? "Type password" : "Your private key"}
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
      {
        error &&
        <div className="import-wallet-form__field-wrapper__error">{error}</div>
      }
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
        onPress={handleSubmit(submit)}
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
  submit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ImportWalletForm.defaultProps = {
  error: "",
};

const selector = formValueSelector('importWalletForm');
export default compose(
  connect(state => ({ type: selector(state, "type") })),
  reduxForm({
    form: 'importWalletForm',
    initialValues: {
      type: "Private key"
    }
  }),
  withHandlers({
    submit: ({ onSubmit, currency }) => values => {
      // todo currency
      if (!bitcore.PrivateKey.isValid(values.get('privateKey').trim())) {
        throw new SubmissionError({
          _error: 'Invalid private key!'
        })
      }
      onSubmit(values);
    },
  })
)(ImportWalletForm)