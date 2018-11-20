import React from 'react';
import PropTypes from "prop-types";
import Immutable from "immutable";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms } from 'components';
import { setAuth } from '../HomeScreen';

import 'assets/screens.scss';
import './style.scss';

const ConfirmBackupScreen = ({
  onSubmit,
}) => (
  <div className="save-backup-phrase-layout">
    <ui.Header/>
    <forms.ConfirmBackupForm
      onSubmit={onSubmit}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);


ConfirmBackupScreen.propTypes = {
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
    onSubmit: ({ router }) => () => {
      setAuth();
      router.history.push('/');
    },
  })
)(ConfirmBackupScreen);
