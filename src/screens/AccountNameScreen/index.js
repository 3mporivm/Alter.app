import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const AccountNameScreen = ({ }) => (
  <div class="account-name-layout">
    <ui.Header/>
    <forms.AccountNameForm
      onSubmit={() => {}}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

export default AccountNameScreen;
