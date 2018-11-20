import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';
import { compose, getContext, withHandlers } from "recompose";
import PropTypes from "prop-types";

const WelcomeBackScreen = ({ }) => (
  <div className="welcome-back-layout">
    <ui.Header/>
    <forms.EnterWalletForm
      onSubmit={() => {}}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

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
      router.history.push({
        pathname: '/auth/account',
      });
    },
  })
)(WelcomeBackScreen);
