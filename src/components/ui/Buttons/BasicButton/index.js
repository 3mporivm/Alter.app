import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../LoadingSpinner';
import './style.scss';

const BasicButton = ({
 onPress,
 title,
 style,
 isDisabled,
 icon,
 isLoading,
}) => (
  <button
    className={`basic-button ${isDisabled ? 'basic-button__disabled' : ''}`}
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
            <div className="basic-button__img-wrapper">
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
  icon: PropTypes.any,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

BasicButton.defaultProps = {
  style: {},
  icon: false,
  isDisabled: false,
  isLoading: false,
};

export default BasicButton;
