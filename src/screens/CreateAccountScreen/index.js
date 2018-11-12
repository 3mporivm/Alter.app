import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const CreateAccountScreen = ({ }) => (
  <div class="protect-account-layout">
    <ui.Header/>
    <forms.CreateAccountForm
      onSubmit={() => {}}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

export default CreateAccountScreen;
