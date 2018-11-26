import React from 'react';
import PropTypes from 'prop-types';
import { ui } from 'components';

import './style.scss';

const Footer = ({
  children,
  icon,
  style,
  backgroundColor,
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
      backgroundColor={backgroundColor}
    />
    {children}
  </div>
);

Footer.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.any.isRequired,
  isLoading: PropTypes.bool,
  wallets: PropTypes.array,
  backgroundColor: PropTypes.string.isRequired,
};

Footer.defaultProps = {
  isLoading: false,
  title: "Continue",
};

export default Footer;
