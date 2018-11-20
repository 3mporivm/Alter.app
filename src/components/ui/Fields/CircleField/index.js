import React from 'react';
import PropTypes from 'prop-types';
import ReactCodeInput from 'react-code-input'

import './style.scss';

const CircleField = ({
  input: {
    value,
    onChange,
  },
  handleChange,
  pattern,
  styleWrapper,
}) => (
  <div
    style={styleWrapper}
    className="circle-field"
  >
    {
      console.log('value', value)
    }
    {
      console.log('value', value.length)
    }
    <ReactCodeInput
      fields={6}
      value={value}
      onChange={onChange}
      className="circle-field__input"
      pattern=".*"
    />
  </div>
);

CircleField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
};

CircleField.defaultProps = {
  styleWrapper: {},
  inputId: '',
};

export default CircleField;
