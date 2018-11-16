import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const ChangePasswordScreen = ({ }) => (
  <div className="change-password-layout">
    <ui.Header/>
    <forms.ChangePasswordForm
      onSubmit={() => {}}
      isFetching={false}
      submitAction={() => {}}
      onSuccess={() => alert('onSuccess')}
    />
  </div>
);

export default ChangePasswordScreen;
