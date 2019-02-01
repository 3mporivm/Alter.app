import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';
import {
  compose,
  lifecycle,
  withState, withStateHandlers,
} from 'recompose';
import * as screens from 'screens';
import { ui, apiHOCs, modals } from 'components';
import { withRouter } from 'react-router-dom';
import iconEmporium from 'assets/img/emporium-logo-big.svg';

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

const App = ({
  isFooterModalOpen,
  selectDeals,
  nextDeals,
}) => (
	<div>
    <Route component={ScrollToTop} />
    <Switch>
      <Route path="/log-in" component={screens.LogInScreen} />
      <Route path="/transaction-signature" component={screens.TransactionSignatureScreen} />
      <Route path="/auth" component={screens.AuthorizationScreen} />
      <Route path="/" component={screens.HomeScreen} />
    </Switch>
    {
      console.log('selectDeals', selectDeals)
    }
    {
      <modals.Footer
        icon={iconEmporium}
        isHide={isFooterModalOpen}
      >
        <ui.TransactionSignature
          onCancel={() => {}}
          onConfirm={nextDeals}
          deal={selectDeals}
        />
      </modals.Footer>
    }
    {
      isFooterModalOpen && <div className="header__hide-background" onClick={() => {}}/>
    }
	</div>
);

App.propTypes = {
  isFooterModalOpen: PropTypes.bool.isRequired,
  selectDeals: PropTypes.object.isRequired,
  nextDeals: PropTypes.func.isRequired,
};

export default compose(
  withRouter,
  apiHOCs.DealsApiHOC(),
  withState('isFooterModalOpen', 'setFooterModalOpen', false),
  withStateHandlers(
    ({ deals }) => ({
      selectDeals: deals.size ? deals.first() : { currencySell: '', currencyBuy: '' },
    }),
    {
      nextDeals: ({ selectDeals }, { deleteDeals, deals }) => () => {
        deleteDeals(selectDeals.id);
        return ({ selectDeals: deals.filter(item => item.get('id') !== selectDeals.id).first() });
      },
    },
  ),
  lifecycle({
    componentWillMount() {
      if (this.props.deals.size && localStorage.getItem('isLogin')) {
        this.props.setFooterModalOpen(true);
      }
      const isNewWindow = localStorage.getItem('isNewWindow');
      const lastPath = localStorage.getItem('lastPath');
      if (!isNewWindow && lastPath) {
        this.props.history.push(lastPath);
      }
    },
    componentDidUpdate() {
      if (this.props.deals.size && !this.props.isFooterModalOpen && localStorage.getItem('isLogin')) {
        this.props.setFooterModalOpen(true);
      }
    },
  }),
)(App);
