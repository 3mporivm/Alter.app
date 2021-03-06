import React from 'react';
import { Switch, Route } from 'react-router';
import * as screens from 'screens';

const App = () => (
	<div>
    <Switch>
      <Route path="/log-in" component={screens.LogInScreen} />
      <Route path="/auth" component={screens.AuthorizationScreen} />
      <Route path="/" component={screens.HomeScreen} />
    </Switch>
	</div>
);

export default App;
