import React from 'react';
import PropTypes from 'prop-types';
import { ui } from 'components';

import './style.scss';

const Footer = ({ children, icon, style }) => (
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
    />
    {children}
  </div>
);

Footer.propTypes = {
  icon: PropTypes.any.isRequired,
  style: PropTypes.any,
  children: PropTypes.element.isRequired,
};

Footer.defaultProps = {
  style: null,
};

export default Footer;
