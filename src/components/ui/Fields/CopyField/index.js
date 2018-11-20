import React from 'react';
import PropTypes from 'prop-types';
import {compose, withHandlers, withStateHandlers} from 'recompose';
import iconCopy from 'assets/img/copy.svg';

import './style.scss';

const CopyField = ({
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
    className="copy-field"
  >
    <label
      className="copy-field__label"
      htmlFor={inputId}
    >
      {label}
    </label>
    <div className="copy-field__input-wrapper">
      <input
        onChange={handleChange}
        ref={ref => setRefInput(ref)}
        id={inputId}
        value={value}
        onFocus={() => refInput.select()}
        readOnly={readOnly}
        className="copy-field__input"
      />
      <img
        className="copy-field__icon"
        src={iconCopy}
        alt=""
        onClick={() => {
          refInput.select();
          document.execCommand("Copy")
        }}
      />
    </div>
  </div>
);

CopyField.propTypes = {
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

CopyField.defaultProps = {
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
)(CopyField);
