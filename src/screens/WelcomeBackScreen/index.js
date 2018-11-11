import React from 'react';
import { ui, forms } from 'components';
import CreateAccountIcon from 'assets/img/create-account.svg';
import ImportAccountIcon from 'assets/img/import-account.svg';

import 'assets/screens.scss';
import './style.scss';

const WelcomeBackScreen = ({ }) => (
  <div class="welcome-back-layout">
    <ui.Header/>
    <forms.EnterWalletForm
      onSubmit={() => {}}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

export default WelcomeBackScreen;
