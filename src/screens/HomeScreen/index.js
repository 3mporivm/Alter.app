import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ui, apiHOCs } from 'components';
import {
  branch,
  compose,
  renderComponent,
  withProps,
} from 'recompose';
import * as screens from 'screens';

const HomeScreen = () => (
  <Switch>
    <Route path="/coin" component={screens.CoinScreen} />
    <Route path="/settings" component={screens.SettingsScreen} />
    <Route path="/" component={screens.OverviewScreen} />
  </Switch>
);

const redirectComponent = withProps({ to: '/auth' })(Redirect);

// todo симуляция авторизации
let isAuth = false

export const setAuth = () => {
  isAuth = true
};
export const getAuth = () => isAuth;

export default compose(
  //apiHOCs.AuthApiHOC(),

  branch(
    ({ getUserSuccess }) => !isAuth,
    renderComponent(redirectComponent),
  ),
)(HomeScreen);
