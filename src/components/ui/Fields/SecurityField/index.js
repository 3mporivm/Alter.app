import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import LockIcon from 'assets/img/lock-input.svg';

import './style.scss';

const SecurityField = ({
  input: {
   value,
  },
  handleChange,
  placeholder,
  pattern,
  styleWrapper,
  inputId,
}) => (
  <div
    style={styleWrapper}
    className="security-field"
  >
    <img
      class="security-field__icon"
      src={LockIcon}
      alt=""
    />
    <input
      id={inputId}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      type="password"
      className="security-field__input"
    />
  </div>
);

SecurityField.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
};

SecurityField.defaultProps = {
  placeholder: '',
  styleWrapper: {},
  inputId: '',
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
  }),
)(SecurityField);
