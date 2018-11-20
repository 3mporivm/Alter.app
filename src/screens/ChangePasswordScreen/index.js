import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';
import PropTypes from "prop-types";
import {compose, getContext, withHandlers} from "recompose";

const ChangePasswordScreen = ({ onBack }) => (
  <div className="change-password-layout">
    <ui.Header onBackPress={onBack}/>
    <forms.ChangePasswordForm
      onSubmit={() => {}}
      isFetching={false}
      submitAction={() => {}}
      onSuccess={() => alert('onSuccess')}
    />
  </div>
);

ChangePasswordScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
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
    onBack: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
  })
)(ChangePasswordScreen);
