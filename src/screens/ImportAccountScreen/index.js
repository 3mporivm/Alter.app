import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, apiHOCs } from 'components';
import { blockchain } from 'helpers';

import 'assets/screens.scss';

const ImportAccountScreen = ({ onSubmit }) => (
  <div>
    <ui.Header/>
    <forms.EnterWalletForm
      onSubmit={onSubmit}
    />
  </div>
);

ImportAccountScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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

      updateProfile({ isRegistered: true, phrase: values.get("seed") });
      router.history.push({ pathname: '/' });
    },
  })
)(ImportAccountScreen);
