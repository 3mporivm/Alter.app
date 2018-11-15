import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import iconCopy from 'assets/img/copy.svg';

import './style.scss';

class MultilineField extends React.Component {
  render() {
    this.refInput = null;
    return (
      <div style={this.props.styleWrapper}>
        <label className="multiline-field__label">{this.props.label}</label>
        <div className="multiline-field">
          <textarea
            rows={3}
            id={this.props.inputId}
            value={this.props.input.value}
            onChange={this.props.handleChange}
            placeholder={this.props.placeholder}
            className="multiline-field__input"
            onFocus={() => this.refInput.select()}
            ref={ref => this.refInput = ref}
            readOnly={this.props.readOnly}
          />
          <img
            class="multiline-field__icon"
            src={iconCopy}
            alt=""
            onClick={() => {
              this.refInput.select();
              this.props.onCopy();
            }}
          />
        </div>
      </div>
    );
  }
}


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
    onCopy: () => () => document.execCommand("Copy"),
  }),
)(MultilineField);