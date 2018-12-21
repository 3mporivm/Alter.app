import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, apiHOCs } from 'components';
import { password } from 'helpers';

import './style.scss';

const LogInScreen = ({ onSubmit }) => (
  <div className="log-in-layout">
    <ui.Header rightIcon={null}/>
    <forms.LogInForm onSubmit={onSubmit}/>
  </div>
);

LogInScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  onLogOut: PropTypes.func.isRequired,
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
  })
)(LogInScreen);
