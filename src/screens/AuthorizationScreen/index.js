import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ui, forms } from 'components';
import {
  GetStartedScreen,
  ProtectAccountScreen,
  AccountScreen,
  WelcomeBackScreen,
  CreateAccountScreen,
  AccountNameScreen,
  SaveBackupPhraseScreen,
  ConfirmBackupScreen,
} from 'screens';

import 'assets/screens.scss';
import './style.scss';
import {branch, compose, renderComponent, withProps} from "recompose";
import { getAuth } from '../HomeScreen';

const AuthorizationScreen = () => (
  <div className="auth-layout">
    <Switch>
      <Route path="/auth/confirm-backup" component={ConfirmBackupScreen} />
      <Route path="/auth/save-backup-phrase" component={SaveBackupPhraseScreen} />
      <Route path="/auth/account-name" component={AccountNameScreen} />
      <Route path="/auth/create" component={CreateAccountScreen} />
      <Route path="/auth/welcome" component={WelcomeBackScreen} />
      <Route path="/auth/account" component={AccountScreen} />
      <Route path="/auth/protect-account" component={ProtectAccountScreen} />
      <Route path="/" component={GetStartedScreen} />
    </Switch>
  </div>
);


export default compose(
  branch(
    ({ }) => getAuth(),
    renderComponent(
      withProps({ to: '/' })(Redirect),
    ),
  ),
)(AuthorizationScreen);