import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms } from 'components';
import iconClose from 'assets/img/close.svg';
import iconLogOut from 'assets/img/log_out.svg';

import 'assets/screens.scss';
import './style.scss';

const SettingsScreen = ({
  onClose,
}) => (
  <div className="setting-layout">
    <ui.Header
      onRightPress={onClose}
      rightIcon={iconClose}
    />
    <ui.AddressCard
      onSubmit={() => {}}
      isFetching={false}
    />
    <div className="setting-layout__buttons">
      <ui.Buttons.ListButton
        title="Network"
        onPress={() => {}}
      />
      <ui.Buttons.ListButton
        title="Password"
        onPress={() => {}}
      />
    </div>
    <ui.Buttons.BasicButton
      title="Log Out"
      color="purple"
      icon={iconLogOut}
      onPress={() => {}}
      style={{
        marginTop: 30,
      }}
    />
    <ui.Buttons.BasicButton
      title="Delete Account"
      style={{
        background: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderStyle: 'solid',
        marginTop: 99,
      }}
      onPress={() => {}}
    />
  </div>
);

SettingsScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
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
    onClose: ({ router }) => () => {
      router.history.push({
        pathname: '/',
      });
    },
  })
)(SettingsScreen);
