import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../../LoadingSpinner';
import iconArrow from 'assets/img/arrow.svg';

import './style.scss';

const NextButton = ({
  onPress,
  title,
  isLoading,
  style,
}) => (
  <button
    className="next-button"
    onClick={onPress}
    type="button"
    style={style}
  >
    {
      isLoading
        ? <LoadingSpinner small/>
        : [
          title,
          <img className="next-button__img" src={iconArrow} alt=""/>,
        ]
    }
  </button>
);

NextButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  style: PropTypes.any,
  isLoading: PropTypes.bool,
};

NextButton.defaultProps = {
  style: {},
  isLoading: false,
  title: "Continue"
};

export default NextButton;
