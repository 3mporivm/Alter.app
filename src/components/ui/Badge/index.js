import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Badge = ({
  icon,
  backgroundColor,
  style,
  styleImg,
}) => (
  <div
    style={{ ...style, backgroundColor }}
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
  style: PropTypes.any,
  icon: PropTypes.any,
  backgroundColor: PropTypes.string,
  styleImg: PropTypes.any,
};

Badge.defaultProps = {
  style: null,
  icon: "",
  backgroundColor: "#B076FF",
  styleImg: {},
};

export default Badge;
