import React from 'react';
import PropTypes from 'prop-types';
import { ui } from 'components';

import './style.scss';

const Footer = ({ children, icon, isHide }) => (
  <div
    className="footer-modal"
    style={{ bottom: isHide ? 0 : -500 }}
  >
    <ui.Badge
      style={{
        marginRight: 25,
        top: -50,
      }}
      icon={icon}
    />
    {children}
  </div>
);

Footer.propTypes = {
  icon: PropTypes.any.isRequired,
  isHide: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Footer.defaultProps = {
  isHide: false,
};

export default Footer;
