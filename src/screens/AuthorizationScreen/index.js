import React from 'react';
import { Switch, Route } from 'react-router';
import { compose, getContext, lifecycle } from 'recompose';
import { ui, forms } from 'components';
import {
  GetStartedScreen,
  ProtectAccountScreen,
  AccountScreen,
  ImportAccountScreen,
  CreateAccountScreen,
  AccountNameScreen,
  SaveBackupPhraseScreen,
  ConfirmBackupScreen,
} from 'screens';
import PropTypes from 'prop-types';

const AuthorizationScreen = () => (
  <div className="auth-layout">
    <Switch>
      <Route path="/auth/confirm-backup" component={ConfirmBackupScreen} />
      <Route path="/auth/save-backup-phrase" component={SaveBackupPhraseScreen} />
      <Route path="/auth/account-name" component={AccountNameScreen} />
      <Route path="/auth/create" component={CreateAccountScreen} />
      <Route path="/auth/import-account" component={ImportAccountScreen} />
      <Route path="/auth/account" component={AccountScreen} />
      <Route path="/auth/protect-account" component={ProtectAccountScreen} />
      <Route path="/" component={GetStartedScreen} />
    </Switch>
    <ui.InfoBlock
      style={{ marginTop: 50 }}
    />
  </div>
);

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  lifecycle({
    componentWillMount() {
      // загружаем баланс кошельков, если еще не згружали
      const lastPath = window.localStorage.getItem('lastPath');
      if (lastPath) {
        this.props.router.history.push(lastPath);
      }
    },
  }),
)(AuthorizationScreen);

// export default AuthorizationScreen;