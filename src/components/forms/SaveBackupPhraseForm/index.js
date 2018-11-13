import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import iconCopy from 'assets/img/copy-badge.svg';
import { required } from 'validators';

import './style.scss';

const SaveBackupPhraseForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
  styleForm,
  styleTitle,
}) => (
  <form onSubmit={handleSubmit} className="save-backup-phrase-form-layout">
    <div className="save-backup-phrase-form">
      <ui.Badge icon={iconCopy} />
      <div style={styleTitle} className="enter-wallet-form__title">
        Save Backup Phrase
      </div>

      <Field
        validate={required}
        component={ui.Fields.MultilineField}
        name="phrase"
        props={{
          inputId: 'phrase',
          styleWrapper: {
            marginTop: 30,
          },
          readOnly: true,
          label: 'Seed',
        }}
      />
      <div className="save-backup-phrase-form__label">Please carefully write down these 15 words or copy them</div>
      <div className="save-backup-phrase-form__background"/>
    </div>
    <ui.Buttons.NextButton
      style={{ marginBottom: 20 }}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
    />
  </form>
);

SaveBackupPhraseForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  reduxForm({
    form: 'saveBackupPhraseForm',
  }),
)(SaveBackupPhraseForm);