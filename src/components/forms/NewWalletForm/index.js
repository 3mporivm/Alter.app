import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { required, minLength } from 'validators';
const minLength3 = minLength(3);

import iconPlusPurple from 'assets/img/plus_purple.svg';

import './style.scss';

const NewWalletForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
  onCancel,
}) => (
  <form onSubmit={handleSubmit} className="new-wallet-form">
    <div style={styleTitle} className="new-wallet-form__title">
      Generate new wallet
    </div>
    <Field
      validate={[required, minLength3]}
      component={ui.Fields.BasicField}
      name="wallet_name"
      placeholder="Wallet name"
      props={{
        inputId: 'wallet_name',
        styleWrapper: {
          marginTop: 30,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(26, 39, 78, 0.15)',
          borderBottomStyle: 'solid',
        },
        styleInput: {
          color: '#000',
        }
      }}
    />
    {
      invalid
        && (
          <span className="new-wallet-form__description">
            The wallet name must be at least 3 characters long.
          </span>
        )
    }
    <div className="new-wallet-form__buttons">
      <ui.Buttons.TransparentButton
        title="Cancel"
        onPress={onCancel}
        style={{
          color: 'black',
          borderColor: 'rgba(26, 39, 78, 0.15)',
          marginRight: 21,
        }}
      />
      <ui.Buttons.BasicButton
        title="Generate"
        color="purple"
        onPress={handleSubmit}
        icon={iconPlusPurple}
        isLoading={isFetching}
        isDisabled={invalid || isFetching}
        style={{ color: '#B076FF' }}
      />
    </div>
  </form>
);

NewWalletForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  reduxForm({
    form: 'newWalletForm',
  }),
)(NewWalletForm);