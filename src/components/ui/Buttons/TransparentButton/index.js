import React from 'react';
import PropTypes from 'prop-types';

import LoadingSpinner from '../../LoadingSpinner';
import './style.scss';

const TransparentButton = ({
 onPress,
 title,
 style,
 isDisabled,
 isLoading,
}) => (
  <button
    className="transparent-button"
    disabled={isDisabled ? 'disabled' : ''}
    onClick={onPress}
    type="button"
    style={style}
  >
    {
      isLoading
        ? <LoadingSpinner small />
        : title
    }
  </button>
);

TransparentButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

TransparentButton.defaultProps = {
  style: null,
  isDisabled: false,
  isLoading: false,
};

export default TransparentButton;
