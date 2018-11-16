import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { required } from 'validators';

import './style.scss';

const SearchForm = ({
}) => (
  <form className="search-form">
    <Field
      validate={required}
      component={ui.Fields.BasicField}
      name="find_coin"
      placeholder="Find coin"
      isSearch
      props={{
        inputId: 'find_coin',
      }}
    />
  </form>
);

SearchForm.propTypes = {
  onChanges: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default compose(
  reduxForm({
    form: 'searchForm',
  }),
)(SearchForm);