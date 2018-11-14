import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';
import Immutable from "immutable";

const ConfirmBackupScreen = ({ }) => (
  <div class="save-backup-phrase-layout">
    <ui.Header/>
    <forms.ConfirmBackupForm
      onSubmit={() => {}}
      isFetching={false}
      initialValues={Immutable.Map({
        words: Immutable.List()
      })}
    />
    <ui.InfoBlock/>
  </div>
);

export default ConfirmBackupScreen;
