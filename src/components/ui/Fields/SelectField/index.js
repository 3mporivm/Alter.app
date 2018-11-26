import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

import './style.scss';

const SelectField = ({
  input: {
   value,
  },
  handleChange,
  styleWrapper,
  inputId,
}) => (
  <div
    style={styleWrapper}
    className="select-field"
  >
    <select
      id={inputId}
      value={value}
      onChange={handleChange}
    >
      <option value="1">Wallet</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
);

SelectField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
};

SelectField.defaultProps = {
  styleWrapper: null,
  inputId: '',
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
  }),
)(SelectField);
