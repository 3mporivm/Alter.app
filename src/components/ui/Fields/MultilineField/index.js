import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import iconCopy from 'assets/img/copy.svg';

let refInput = React.createRef();
import './style.scss';

const MultilineField = ({
  input: {
   value,
  },
  handleChange,
  placeholder,
  pattern,
  styleWrapper,
  inputId,
  onCopy,
  readOnly,
  label,
}) => (
  <div style={styleWrapper}>
    <label className="multiline-field__label">{label}</label>
    <div className="multiline-field">
      <textarea
        rows={3}
        id={inputId}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="multiline-field__input"
        onFocus={() => refInput.select()}
        ref={ref => refInput = ref}
        readOnly={readOnly}
      />
      <img
        class="multiline-field__icon"
        src={iconCopy}
        alt=""
        onClick={onCopy}
      />
    </div>
  </div>
);

MultilineField.propTypes = {
  placeholder: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
  onCopy: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
};

MultilineField.defaultProps = {
  placeholder: '',
  styleWrapper: {},
  inputId: '',
  readOnly: false,
  label: '',
};

export default compose(
  withHandlers({
    handleChange: ({ input: { onChange, value } }) => (evt) => {
      onChange(evt.target.validity.valid ? evt.target.value : value);
    },
    onCopy: () => () => {
      refInput.select();
      document.execCommand("Copy");
    },
  }),
)(MultilineField);
