import React from 'react';
import PropTypes from "prop-types";
import { ui, forms } from 'components';
import { compose, getContext, withHandlers } from "recompose";
import { connect } from 'react-redux'
import { reset } from 'redux-form';
import { SALT } from 'constants/constants';
const bcrypt = require('bcryptjs');

import 'assets/screens.scss';
import './style.scss';

const ChangePasswordScreen = ({ onBack, onSubmit }) => (
  <div className="change-password-layout">
    <ui.Header onBackPress={onBack}/>
    <forms.ChangePasswordForm onSubmit={onSubmit}/>
  </div>
);

ChangePasswordScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default compose(
  connect(),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onBack: ({ router }) => () => {
      router.history.push({ pathname: '/settings' });
    },
    onSubmit: ({ dispatch }) => (values) => {
      // save new password in storage
      localStorage.setItem('password', bcrypt.hashSync(values.get('newPassword'), SALT));
      // reset form
      dispatch(reset('changePasswordForm'));
    },
  })
)(ChangePasswordScreen);
