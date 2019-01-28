import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers, lifecycle } from 'recompose';
import { ui, forms, apiHOCs } from 'components';
import { blockchain } from 'helpers';

const ImportAccountScreen = ({ onSubmit, onBack }) => (
  <div>
    <ui.Header onBackPress={onBack} />
    <forms.EnterWalletForm
      onSubmit={onSubmit}
    />
  </div>
);

ImportAccountScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
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
  withHandlers({
    onSubmit: ({ router, updateProfile, createFirstWallets }) => (values) => {
      // создаем по одному кошельку, каждой валюты
      createFirstWallets(blockchain.createCoins(values.get("seed")));

      localStorage.setItem('isLogin', 'true');
      updateProfile({ isRegistered: true, phrase: values.get("seed") });
      router.history.push({ pathname: '/' });
    },
    onBack: ({ router }) => () => router.history.goBack(),
  }),
  lifecycle({
    componentWillMount() {
      window.localStorage.setItem('lastPath', '/auth/import-account');
    },
  }),
)(ImportAccountScreen);
