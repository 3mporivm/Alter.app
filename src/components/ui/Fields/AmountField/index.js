import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import iconDropdown from 'assets/img/dropdown.svg';

import './style.scss';

const AmountField = ({
  input: {
   value,
  },
  handleChange,
  styleWrapper,
  inputId,
  setRefInput,
  refInput,
  label,
  readOnly,
}) => (
  <div
    style={styleWrapper}
    className="amount-field"
  >
    <label
      className="amount-field__label"
      htmlFor={inputId}
    >
      {label}
    </label>
    <div className="amount-field__input-wrapper">
      <input
        onChange={handleChange}
        ref={ref => setRefInput(ref)}
        id={inputId}
        value={value}
        onFocus={() => refInput.select()}
        readOnly={readOnly}
        className="amount-field__input-wrapper__input"
      />
      <div className="amount-field__input-wrapper__dropdown">
        BTC
        <img
          className="amount-field__input-wrapper__dropdown__icon"
          src={iconDropdown}
          alt=""
          onClick={() => {
            refInput.select();
            document.execCommand("Copy")
          }}
        />
      </div>
    </div>
  </div>
);

AmountField.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
  setRefInput: PropTypes.func.isRequired,
  refInput: PropTypes.any,
  readOnly: PropTypes.bool,
};

AmountField.defaultProps = {
  label: '',
  styleWrapper: {},
  inputId: '',
  refInput: null,
  readOnly: false,
};

export default compose(
  withStateHandlers(
    { refInput: null },
    {
      setRefInput: ({ refInput }) => ref => {
        if (refInput === null) {
          return ({ refInput: ref })
        }
      }
    }
  ),
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
  }),
)(AmountField);
