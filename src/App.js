import React from 'react';
import { Switch, Route } from 'react-router';
import { compose, getContext, lifecycle } from 'recompose';
import * as screens from 'screens';
import PropTypes from 'prop-types';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const App = () => (
	<div>
    <Route component={ScrollToTop} />
    <Switch>
      <Route path="/log-in" component={screens.LogInScreen} />
      <Route path="/auth" component={screens.AuthorizationScreen} />
      <Route path="/" component={screens.HomeScreen} />
    </Switch>
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
      const lastPath = window.localStorage.getItem('lastPath');
      if (lastPath) {
        this.props.router.history.push(lastPath);
      }
    },
  }),
)(App);
