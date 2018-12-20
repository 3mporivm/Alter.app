import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, apiHOCs } from 'components';
import iconClose from 'assets/img/close.svg';
import iconLogOut from 'assets/img/log_out.svg';
import { password } from 'helpers';

import './style.scss';

const LogInScreen = ({
  onClose,
  onLogOut,
}) => (
  <div className="setting-layout">
    <ui.Header
      isExtended
      onRightPress={onClose}
      rightIcon={iconClose}
      title="LogInScreen"
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
  </div>
);

LogInScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
};

export default compose(
  //apiHOCs.ProfileApiHOC(),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onClose: ({ router }) => () => router.history.goBack(),
    onLogOut: ({ router }) => () => {
      localStorage.removeItem("isLogin");
      router.history.push({ pathname: '/' });
    },
  })
)(LogInScreen);
