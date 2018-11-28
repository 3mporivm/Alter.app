import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import LockIcon from 'assets/img/lock-input.svg';
import iconSearch from 'assets/img/search.svg';

import './style.scss';

const BasicField = ({
  input: {
   value,
  },
  handleChange,
  placeholder,
  pattern,
  styleWrapper,
  styleInput,
  inputId,
  isSecurity,
  isSearch,
  label,
}) => (
  <div
    style={styleWrapper}
    className="basic-field"
  >
    {
      label &&
      <label
        className="basic-field__label"
        htmlFor={inputId}
      >
        {label}
      </label>
    }
    <div className="basic-field__input-wrapper">
      {
        isSecurity &&
        <img
          className="basic-field__input-wrapper__icon"
          src={LockIcon}
          alt=""
        />
      }
      <input
        style={styleInput}
        id={inputId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type={isSecurity ? "password" : "text"}
        className="basic-field__input-wrapper__input"
      />
      {
        isSearch &&
        <img
          style={value ? { opacity: 1 } : {}}
          className="basic-field__input-wrapper__icon-search"
          src={iconSearch}
          alt=""
        />
      }
    </div>
  </div>
);

BasicField.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  styleInput: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
  isSecurity: PropTypes.bool,
  isSearch: PropTypes.bool,
};

BasicField.defaultProps = {
  placeholder: '',
  label: '',
  styleWrapper: null,
  styleInput: null,
  inputId: '',
  isSecurity: false,
  isSearch: false,
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
  }),
)(BasicField);
