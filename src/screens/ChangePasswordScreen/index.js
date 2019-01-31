import React from 'react';
import PropTypes from 'prop-types';
import { ui, forms } from 'components';
import {
  compose,
  getContext,
  withHandlers,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import { password } from 'helpers';

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
    onBack: ({ router }) => () => router.history.goBack(),
    onSubmit: ({ dispatch }) => (values) => {
      // save new password in storage
      password.set(values.get("newPassword"));
      // reset form
      dispatch(reset('changePasswordForm'));
    },
  }),
  lifecycle({
    componentWillMount() {
      window.localStorage.setItem('lastPath', '/change-password');
    },
  }),
)(ChangePasswordScreen);
