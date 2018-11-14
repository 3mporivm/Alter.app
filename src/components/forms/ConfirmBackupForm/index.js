import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconCheck from 'assets/img/check.svg';
import { required } from 'validators';

import './style.scss';

const ConfirmBackupForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="confirm-backup-form-layout">
    <div className="confirm-backup-form">
      <ui.Badge icon={iconCheck} />
      <div style={styleTitle} className="enter-wallet-form__title">
        Confirm Backup
      </div>
      <Field
        component={ui.Fields.PuzzlesField}
        name="words"
        props={{
          inputId: 'words',
          styleWrapper: {
            marginTop: 30,
          },
          readOnly: true,
        }}
      />
      <div className="confirm-backup-form__label">Please carefully write down these 15 words or copy them</div>
      <div className="confirm-backup-form__background"/>
    </div>
    <ui.Buttons.NextButton
      style={{ marginBottom: 50 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={true}
    />
  </form>
);

ConfirmBackupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  reduxForm({
    form: 'saveBackupPhraseForm',
  }),
)(ConfirmBackupForm);