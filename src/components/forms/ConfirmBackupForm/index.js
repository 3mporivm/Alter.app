import React from 'react';
import {compose, withHandlers} from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import iconCheck from 'assets/img/check.svg';
import { required, minLengthArray } from 'validators';

const minLengthArray12 = minLengthArray(12)

import './style.scss';

const ConfirmBackupForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
  phrase,
  submit,
  error,
}) => (
  <form onSubmit={handleSubmit(submit)} className="confirm-backup-form-layout">
    <div className="confirm-backup-form">
      <ui.Badge icon={iconCheck} />
      <div style={styleTitle} className="enter-wallet-form__title">
        Confirm Backup
      </div>
      <Field
        validate={minLengthArray12}
        component={ui.Fields.PuzzlesField}
        name="phrase"
        props={{
          inputId: 'phrase',
          styleWrapper: {
            marginTop: 30,
          },
          readOnly: true,
          phrase,
        }}
      />
      <div className="confirm-backup-form__label">Please carefully write down these 12 words or copy them</div>
    </div>
    {
      error &&
      <div className="confirm-backup-form-layout__error">{error}</div>
    }
    <ui.Buttons.NextButton
      onPress={handleSubmit(submit)}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
    />
  </form>
);

ConfirmBackupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

ConfirmBackupForm.defaultProps = {
  error: "",
};

export default compose(
  reduxForm({
    form: 'confirmBackupPhraseForm',
    initialValues: {
      phrase: [],
    },
  }),
  withHandlers({
    submit: ({ phrase, onSubmit }) => values => {
      if (phrase !== values.get('phrase').join(' ')) {
        throw new SubmissionError({
          _error: 'Phrase does not match the confirm phrase!'
        })
      }
      onSubmit(values);
    },
  })
)(ConfirmBackupForm);