import React from 'react';
import { ui, forms } from 'components';
import CreateAccountIcon from 'assets/img/create-account.svg';
import ImportAccountIcon from 'assets/img/import-account.svg';

import 'assets/screens.scss';
import './style.scss';

const AccountScreen = ({ }) => (
  <div className="account-layout">
    <ui.Header/>
    <div className="account-layout__create">
      <img className="account-layout__image" src={CreateAccountIcon} alt=""/>
      <span className="account-layout__title">Create a New Account</span>
    </div>
    <div className="account-layout__import">
      <img className="account-layout__image" src={ImportAccountIcon} alt=""/>
      <span className="account-layout__title">Import Account Via Seed</span>
    </div>
    <ui.InfoBlock/>
  </div>
);

export default AccountScreen;
