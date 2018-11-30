import React from 'react';
import { compose } from 'recompose';
import { Field, reduxForm } from 'redux-form/immutable';
import { ui } from 'components';

import './style.scss';

const SearchForm = () => (
  <form className="search-form">
    <Field
      component={ui.Fields.BasicField}
      name="find_coin"
      placeholder="Find coin"
      isSearch
      props={{ inputId: 'find_coin' }}
    />
  </form>
);

export default compose(
  reduxForm({ form: 'searchForm' }),
)(SearchForm);