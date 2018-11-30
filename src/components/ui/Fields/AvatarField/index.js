import React from 'react';
import PropTypes from 'prop-types';
import { AVATARS } from 'constants/constants';

import './style.scss';

const AvatarField = ({
  input: {
    value,
    onChange,
  },
  pattern,
  styleWrapper,
}) => (
  <div
    style={styleWrapper}
    className="avatar-field"
  >
    {
      AVATARS.map((icon, index) => (
        <img
          key={index}
          onClick={() => onChange(index.toString())}
          className="avatar-field__icon"
          style={value === index.toString() ? { opacity: 1 } : {}}
          src={icon}
          alt=""
        />
      ))
    }
  </div>
);

AvatarField.propTypes = {
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
};

AvatarField.defaultProps = {
  styleWrapper: {},
  inputId: '',
};

export default AvatarField;
