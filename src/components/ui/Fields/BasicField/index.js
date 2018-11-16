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
  inputId,
  isSecurity,
  isSearch,
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
    {
      isSearch &&
      <img
        style={value ? { opacity: 1 } : {}}
        className="basic-field__icon-search"
        src={iconSearch}
        alt=""
      />
    }
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
  isSearch: PropTypes.bool,
};

BasicField.defaultProps = {
  placeholder: '',
  styleWrapper: {},
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
