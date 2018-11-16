import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import LockIcon from 'assets/img/lock-input.svg';

import './style.scss';

const BasicField = ({
  input: {
   value,
  },
  handleChange,
  placeholder,
  pattern,
  styleWrapper,
  inputId,
  isSecurity,
}) => (
  <div
    style={styleWrapper}
    className="basic-field"
  >
    {
      isSecurity &&
      <img
        className="basic-field__icon"
        src={LockIcon}
        alt=""
      />
    }
    <input
      id={inputId}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type={isSecurity ? "password" : "text"}
      className="basic-field__input"
    />
  </div>
);

BasicField.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
  isSecurity: PropTypes.bool,
};

BasicField.defaultProps = {
  placeholder: '',
  styleWrapper: {},
  inputId: '',
  isSecurity: false,
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
  }),
)(BasicField);
