import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ui, apiHOCs } from 'components';
import {
  branch,
  compose, lifecycle,
  renderComponent,
  withProps,
} from 'recompose';
import * as screens from 'screens';

const HomeScreen = () => (
  <Switch>
    <Route path="/coin" component={screens.CoinScreen} />
    <Route path="/wallet" component={screens.WalletScreen} />
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
    () => {
      let profile = JSON.parse(localStorage.getItem("profile"));
      return !(profile && profile.isRegistered)
    },
    renderComponent(withProps({ to: '/auth' })(Redirect)),
  ),
  branch(
    () => localStorage.getItem("isClosedBrowser"),
    renderComponent(withProps({ to: '/settings' })(Redirect)),
  ),
)(HomeScreen);
