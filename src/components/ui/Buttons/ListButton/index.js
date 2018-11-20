import React from 'react';
import PropTypes from 'prop-types';
import iconArrow from 'assets/img/arrow-right.svg';

import './style.scss';

const ListButton = ({
 onPress,
 title,
 style,
}) => (
  <button
    className="list-button"
    onClick={onPress}
    type="button"
    style={style}
  >
    {title}
    <img className="list-button__icon" src={iconArrow} alt="" />
  </button>
);

ListButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.any,
};

ListButton.defaultProps = {
  style: {},
};

export default ListButton;
