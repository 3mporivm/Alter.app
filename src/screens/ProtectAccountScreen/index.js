import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const ProtectAccountScreen = ({ }) => (
  <div className="protect-account-layout">
    <ui.Header/>
    <forms.ProtectAccountForm
      onSubmit={() => {}}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

export default ProtectAccountScreen;
