import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, apiHOCs } from 'components';
import iconClose from 'assets/img/close.svg';
import iconLogOut from 'assets/img/log_out.svg';
import { password } from 'helpers';

import 'assets/screens.scss';
import './style.scss';

const SettingsScreen = ({
  onClose,
  onLogOut,
  onChangePassword,
}) => (
  <div className="setting-layout">
    <ui.Header
      onRightPress={onClose}
      rightIcon={iconClose}
    />
    <ui.Buttons.ListButton
      title="Password"
      onPress={onChangePassword}
      style={{
        marginTop: 30,
      }}
    />
    <ui.Buttons.BasicButton
      title="Log Out"
      color="purple"
      icon={iconLogOut}
      onPress={onLogOut}
      style={{
        marginTop: 90,
      }}
    />
    <ui.Buttons.TransparentButton
      title="Delete Account"
      style={{ marginTop: 30, marginBottom: 30 }}
      onPress={() => {}}
    />
  </div>
);

SettingsScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default compose(
  apiHOCs.ProfileApiHOC(),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onClose: ({ router }) => () => router.history.goBack(),
    onChangePassword: ({ router }) => () => router.history.push('/change-password'),
    onLogOut: ({ router, cleanStore }) => () => {
      cleanStore();
      localStorage.removeItem('profile');
      password.remove();
      router.history.push({ pathname: '/' });
    },
  })
)(SettingsScreen);
