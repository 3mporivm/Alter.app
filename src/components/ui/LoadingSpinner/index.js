import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'better-react-spinkit';

import './style.scss';

const LoadingSpinner = ({
  fullSize,
  style,
  circleProps,
  small,
  color,
}) => (
  <div className="spinner-outer" style={{ height: fullSize ? '100vh' : 'auto', ...style }}>
    <Circle
      scaleStart={0.4}
      scaleEnd={0.7}
      size={small ? 25 : 80}
      color={color}
      {...circleProps}
    />
  </div>
);

LoadingSpinner.propTypes = {
  fullSize: PropTypes.bool,
  style: PropTypes.object,
  circleProps: PropTypes.object,
  small: PropTypes.bool,
  color: PropTypes.string,
};

LoadingSpinner.defaultProps = {
  fullSize: false,
  style: {},
  circleProps: {},
  small: false,
  color: 'white',
};

export default LoadingSpinner;
