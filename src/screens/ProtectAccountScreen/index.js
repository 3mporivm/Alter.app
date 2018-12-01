import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext , withHandlers } from "recompose";
import { ui, forms, apiHOCs } from 'components';
import { password } from 'helpers';

import 'assets/screens.scss';
import './style.scss';

const ProtectAccountScreen = ({ onSubmit }) => (
  <div className="protect-account-layout">
    <ui.Header/>
    <forms.ProtectAccountForm onSubmit={onSubmit}/>
  </div>
);

ProtectAccountScreen.propTypes = {
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
    onSubmit: ({ router }) => (values) => {
      password.set(values.get("password"))
      router.history.push({
        pathname: '/auth/account',
      });
    },
  })
)(ProtectAccountScreen);
