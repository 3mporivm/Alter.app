import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext, withHandlers } from 'recompose';
import { ui, forms } from 'components';

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
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onSubmit: ({ router }) => () => {
      localStorage.setItem('isLogin', 'true');
      router.history.push({ pathname: '/' });
    },
  }),
)(LogInScreen);
