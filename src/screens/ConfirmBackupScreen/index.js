import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers, withProps, lifecycle } from 'recompose';
import { ui, forms, apiHOCs } from 'components';
import { blockchain } from 'helpers';

import './style.scss';

const ConfirmBackupScreen = ({
  onSubmit,
  phrase,
  onBack,
}) => (
  <div className="save-backup-phrase-layout">
    <ui.Header onBackPress={onBack} />
    <forms.ConfirmBackupForm
      onSubmit={onSubmit}
      isFetching={false}
      phrase={phrase}
    />
  </div>
);

ConfirmBackupScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  phrase: PropTypes.string.isRequired,
  onBack: PropTypes.string.isRequired,
};

export default compose(
  apiHOCs.ProfileApiHOC(),
  apiHOCs.WalletsApiHOC(),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withProps(({ location }) => ({
    phrase: _.get(location, 'state.phrase') || window.localStorage.getItem('phrase'),
  })),
  withHandlers({
    onSubmit: ({ router, updateProfile, phrase, createFirstWallets }) => () => {
      // создаем по одному кошельку, каждой валюты
      createFirstWallets(blockchain.createCoins(phrase));

      localStorage.setItem('isLogin', 'true');
      updateProfile({ isRegistered: true, phrase });
      router.history.push('/');
    },
    onBack: ({ router }) => () => router.history.goBack(),
  }),
  lifecycle({
    componentDidMount() {
      const { phrase } = this.props;
      if (phrase) {
        window.localStorage.setItem('phrase', phrase);
      }
      window.localStorage.setItem('lastPath', '/auth/confirm-backup');
    },
  }),
)(ConfirmBackupScreen);
