import React from 'react';
import { Switch, Route } from 'react-router';
import * as screens from 'screens';
import { compose, lifecycle } from "recompose";
import { store } from './index';

const App = () => (
	<div>
    <Switch>
      <Route path="/settings" component={screens.SettingsScreen} />
      <Route path="/auth" component={screens.AuthorizationScreen} />
      <Route path="/" component={screens.HomeScreen} />
    </Switch>
	</div>
);

export default compose(
  lifecycle({
    componentDidMount() {
      const entities = store.getState().get("entities").toJS();
      console.log("entities", entities)
      window.addEventListener("beforeunload", function () {
        localStorage.setItem("isClose", "close");
      });
    }
  }),
)(App);

//console.log("UPDATE_ENTITIES");