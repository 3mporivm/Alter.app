import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconPencil from 'assets/img/pencil.svg';
import { required, minLength } from 'validators';

const minLength6 = minLength(6)

import './style.scss';

const AccountNameForm = ({
  handleSubmit,
  facebookLoginRequest,
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
        validate={[ required, minLength6 ]}
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
    </div>
    <ui.Buttons.NextButton
      onPress={handleSubmit}
      isDisabled={invalid}
    />
  </form>
);

AccountNameForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(
  reduxForm({
    form: 'accountNameForm',
  }),
)(AccountNameForm);