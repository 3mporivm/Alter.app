import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconPencil from 'assets/img/pencil.svg';
import { required } from 'validators';

import './style.scss';

const AccountNameForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="account-name-form-wrapper">
    <div className="account-name-form">
      <ui.Badge icon={iconPencil} />
      <div style={styleTitle} className="account-name-form__title">
        Account Name
      </div>
      <Field
        validate={required}
        component={ui.Fields.BasicField}
        name="name"
        placeholder="Enter account name"
        props={{
          inputId: 'name',
          styleWrapper: {
            marginTop: 30,
          }
        }}
      />
      <div className="account-name-form__label">The account name will be known only to you</div>
      <div className="account-name-form__background"/>
    </div>
    <ui.Buttons.NextButton
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
    />
  </form>
);

AccountNameForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  reduxForm({
    form: 'accountNameForm',
  }),
)(AccountNameForm);