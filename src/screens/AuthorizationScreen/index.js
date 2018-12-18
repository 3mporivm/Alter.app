import React from 'react';
import { Switch, Route } from 'react-router';
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

export default AuthorizationScreen;