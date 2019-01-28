import React from 'react';
import PropTypes from "prop-types";
import { ui, forms } from 'components';
import { compose, getContext, withHandlers, lifecycle } from "recompose";
import CreateAccountIcon from 'assets/img/create-account.svg';
import ImportAccountIcon from 'assets/img/import-account.svg';

import './style.scss';

const AccountScreen = ({
  onCreate,
  onImport,
  onBack,
}) => (
  <div className="account-layout">
    <ui.Header onBackPress={onBack} />
    <div
      onClick={() => onCreate()}
      className="account-layout__create"
    >
      <img className="account-layout__image" src={CreateAccountIcon} alt=""/>
      <span className="account-layout__title">Create a New Account</span>
    </div>
    <div
      onClick={() => onImport()}
      className="account-layout__import"
    >
      <img className="account-layout__image" src={ImportAccountIcon} alt=""/>
      <span className="account-layout__title">Import Account Via Seed</span>
    </div>
  </div>
);

AccountScreen.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onCreate: ({ router }) => () => {
      router.history.push({
        pathname: '/auth/create',
      });
    },
    onImport: ({ router }) => () => {
      router.history.push({
        pathname: '/auth/import-account',
      });
    },
    onBack: ({ router }) => () => router.history.goBack(),
  }),
  lifecycle({
    componentWillMount() {
      window.localStorage.setItem('lastPath', '/auth/account');
    },
  }),
)(AccountScreen);
