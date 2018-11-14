import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, withState } from 'recompose';

let refInput = React.createRef();
import './style.scss';

const PuzzlesField = ({
  input: {
   value = [],
  },
  handleChange,
  placeholder,
  pattern,
  styleWrapper,
  inputId,
  label,
  words,
  unselected,
}) => (
  <div
    style={styleWrapper}
    className="puzzles-field"
  >
    <label className="puzzles-field__label">Confirmation</label>
    <div className="puzzles-field__selected-words">
      {
        value.map(item => (
          <span
            onClick={() => unselected(item)}
            className="puzzles-field__words__word"
          >
            {item}
          </span>
        ))
      }
    </div>
    <label className="puzzles-field__label">Please tap each word in the correct order</label>
    <div className="puzzles-field__words">
      {
        words.map(item => (
          <span
            onClick={() => handleChange(item)}
            className={`puzzles-field__words__word ${item.isSelected ? 'puzzles-field__words__word-selected' : ''}`}
          >
            {item.word}
          </span>
        ))
      }
    </div>
  </div>
);

PuzzlesField.propTypes = {
  placeholder: PropTypes.string,
  unselected: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  styleWrapper: PropTypes.any,
  input: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }).isRequired,
  inputId: PropTypes.string,
  words: PropTypes.array.isRequired,
};

PuzzlesField.defaultProps = {
  placeholder: '',
  styleWrapper: {},
  inputId: '',
  readOnly: false,
};

export default compose(
  withState('words', 'updateWords', [
    { word: "Ketchup" },
    { word: "Viable" },
    { word: "Sport" },
    { word: "Car" },
    { word: "Man" },
    { word: "Jungle" },
    { word: "Coin" },
    { word: "Green" },
    { word: "Coat" },
    { word: "Shoes" },
    { word: "Web" },
    { word: "Dog" },
    { word: "Table" },
    { word: "Jeans" },
    { word: "Milk" },
  ]),
  withHandlers({
    handleChange: ({ words, updateWords, input: { onChange, value = [] } }) => ({ word, isSelected }) => {
      updateWords(words.map(item => item.word !== word ? item : { ...item, isSelected: true }));
      !isSelected && onChange(value.push(word));
    },
    unselected: ({ words, updateWords, input: { onChange, value = [] } }) => (word) => {
      updateWords(words.map(item => item.word !== word ? item : { ...item, isSelected: false }));
      onChange(value.filter((item) => item !== word));
    },
  }),
)(PuzzlesField);
