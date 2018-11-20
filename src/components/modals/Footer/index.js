import React from 'react';
import PropTypes from 'prop-types';
import { ui } from 'components';
//import iconBackgroundModal from 'assets/img/background-modal.svg';

import './style.scss';

const Footer = ({
  children,
  icon,
  style,
  isLoading,
  wallets,
}) => (
  <div
    style={style}
    className="footer-modal"
  >
    <ui.Badge
      style={{
        marginRight: 25,
        top: -50,
      }}
      icon={icon}
      backgroundColor="#B076FF"
    />
    {children}
  </div>
);

Footer.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
  wallets: PropTypes.array,
};

Footer.defaultProps = {
  isLoading: false,
  title: "Continue",
};

export default Footer;
