import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../LoadingSpinner';
import './style.scss';

const BasicButton = ({
 onPress,
 title,
 style,
 styleIcon,
 isDisabled,
 icon,
 isLoading,
 color,
}) => (
  <button
    className={`basic-button ${color}`}
    disabled={isDisabled ? 'disabled' : ''}
    onClick={onPress}
    type="button"
    style={style}
  >
    {
      isLoading
        ? <LoadingSpinner small />
        : [
          icon && (
            <div
              key="icon"
              className="basic-button__img-wrapper img-wrapper"
              style={styleIcon}
            >
              <img key="imgButton" className="basic-button__img" src={icon} alt="" />
            </div>
          ),
          title,
        ]
    }
  </button>
);

BasicButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  styleIcon: PropTypes.any,
  icon: PropTypes.any,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  color: PropTypes.string,
};

BasicButton.defaultProps = {
  style: {},
  styleIcon: {},
  icon: false,
  isDisabled: false,
  isLoading: false,
  color: 'blue',
};

export default BasicButton;
