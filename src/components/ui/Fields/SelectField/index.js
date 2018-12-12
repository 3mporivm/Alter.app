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
  placeholder,
  options,
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
      <option disabled hidden>{placeholder}</option>
      {
        options.map(value => <option key={value} value={value}>{value}</option>)
      }
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
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
};

SelectField.defaultProps = {
  styleWrapper: null,
  inputId: '',
  placeholder: '',
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
  }),
)(SelectField);
