import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext, withHandlers } from 'recompose';
import { ui, forms } from 'components';
import { withRouter } from 'react-router-dom';
import './style.scss';

const LogInScreen = ({ onSubmit }) => (
  <div className="log-in-layout">
    <ui.Header rightIcon={null} />
    <forms.LogInForm onSubmit={onSubmit} />
  </div>
);

LogInScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  withHandlers({
    onSubmit: ({ history }) => () => {
      localStorage.setItem('isLogin', 'true');
      history.push({ pathname: '/' });
    },
  }),
)(LogInScreen);
