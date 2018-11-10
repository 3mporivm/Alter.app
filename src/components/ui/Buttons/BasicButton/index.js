import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../LoadingSpinner';
import './style.scss';

const iconPath = 'assets/img/';

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
          icon && <img key="imgButton" className="basic-button__img" src={iconPath + icon} alt="" />,
          title,
        ]
    }
  </button>
);

BasicButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

BasicButton.defaultProps = {
  style: {},
  isDisabled: false,
  isLoading: false,
};

export default BasicButton;
