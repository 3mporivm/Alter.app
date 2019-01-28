import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext , withHandlers, lifecycle } from 'recompose';
import { ui, forms, apiHOCs } from 'components';
import { password } from 'helpers';

import './style.scss';

const ProtectAccountScreen = ({ onSubmit, onBack }) => (
  <div className="protect-account-layout">
    <ui.Header onBackPress={onBack} />
    <forms.ProtectAccountForm onSubmit={onSubmit}/>
  </div>
);

ProtectAccountScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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
    onSubmit: ({ router }) => (values) => {
      password.set(values.get("password"));
      router.history.push({
        pathname: '/auth/account',
      });
    },
    onBack: ({ router }) => () => router.history.goBack(),
  }),
  lifecycle({
    componentWillMount() {
      window.localStorage.setItem('lastPath', '/auth/protect-account');
    },
  }),
)(ProtectAccountScreen);
