import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Badge = ({
  icon,
  backgroundColor,
  styleImg,
}) => (
  <div
    style={{ backgroundColor }}
    className="badge"
  >
    <img
      style={styleImg}
      src={icon}
      alt=""
    />
  </div>
);

Badge.propTypes = {
  icon: PropTypes.any,
  backgroundColor: PropTypes.string,
  styleImg: PropTypes.any,
};

Badge.defaultProps = {
  icon: "",
  backgroundColor: "#B076FF",
  styleImg: {},
};

export default Badge;
