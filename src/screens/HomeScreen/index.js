import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { apiHOCs } from 'components';
import {
  branch,
  compose,
  renderComponent,
  withProps,
} from 'recompose';
import * as screens from 'screens';

const HomeScreen = () => (
  <Switch>
    <Route path="/coin/:name" component={screens.CoinScreen} />
    <Route path="/:coin/wallet/:address" component={screens.WalletScreen} />
    <Route path="/settings" component={screens.SettingsScreen} />
    <Route path="/change-password" component={screens.ChangePasswordScreen} />
    <Route path="/send" component={screens.SendScreen} />
    <Route path="/receive" component={screens.ReceiveScreen} />
    <Route path="/" component={screens.OverviewScreen} />
  </Switch>
);

export default compose(
  apiHOCs.BootApiHOC(),
  branch(
    () => localStorage.getItem('isNewWindow'),
    renderComponent(withProps({ to: '/transaction-signature' })(Redirect)),
  ),
  branch(
    ({ profile }) => !profile.get('isRegistered'),
    renderComponent(withProps({ to: '/auth' })(Redirect)),
  ),
  branch(
    () => !localStorage.getItem('isLogin'),
    renderComponent(withProps({ to: '/log-in' })(Redirect)),
  ),
)(HomeScreen);
