import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';

import './style.scss';

const FileField = ({
  input: {
   value,
  },
  handleChange,
  pattern,
  inputId,
  styleWrapper,
  label,
  result,
  uploadFile,
}) => (
  <label
    style={styleWrapper}
    className="file-field"
    for={inputId}
  >
    {
      label &&
      <div
        className="file-field__label"
      >
        {`${label} `}
        <span className="file-field__label__result">{result}</span>
      </div>
    }
    <div className="file-field__choose_file">
      Choose file
    </div>
    <input
      //accept="image/*"
      id={inputId}
      value={value}
      onChange={uploadFile}
      type="file"
      className="file-field__input"
    />
  </label>
);

FileField.propTypes = {
  styleWrapper: PropTypes.any,
  label: PropTypes.string,
  result: PropTypes.string,
  uploadFile: PropTypes.func.isRequired,
  styleInput: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
};

FileField.defaultProps = {
  styleWrapper: null,
  label: '',
  result: '',
  inputId: '',
};


export default compose(
  withHandlers({
    uploadFile: ({ setImageIsFetching, input: { onChange } }) => (e) => {
      console.log('e', e.target.files[0])
      // uploadImage(e).then(({ url }) => {
      //   if (url) {
      //     onChange(url);
      //   }
      // });
    },
  }),
)(FileField);
