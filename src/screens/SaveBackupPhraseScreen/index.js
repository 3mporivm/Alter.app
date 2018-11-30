import React from 'react';
import PropTypes from "prop-types";
import Immutable from "immutable";
import bip39 from "bip39";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const SaveBackupPhraseScreen = ({
  onSubmit,
  onCancel,
}) => (
  <div className="save-backup-phrase-layout">
    <ui.Header/>
    <forms.SaveBackupPhraseForm
      onSubmit={onSubmit}
      isFetching={false}
      initialValues={Immutable.Map({
        phrase: bip39.generateMnemonic()
      })}
    />
    <ui.Buttons.TransparentButton
      title="Cancel Creation"
      onPress={onCancel}
    />
  </div>
);

SaveBackupPhraseScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onSubmit: ({ router }) => values => {
      router.history.push({
        pathname: '/auth/confirm-backup',
        state: {
          phrase: values.get('phrase'),
        },
      });
    },
    onCancel: ({ router }) => () => {
      router.history.push({ pathname: '/auth/account' });
    },
  })
)(SaveBackupPhraseScreen);
