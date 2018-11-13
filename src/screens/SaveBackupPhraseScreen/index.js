import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';
import Immutable from "immutable";

const SaveBackupPhraseScreen = ({ }) => (
  <div class="save-backup-phrase-layout">
    <ui.Header/>
    <forms.SaveBackupPhraseForm
      onSubmit={() => {}}
      isFetching={false}
      initialValues={Immutable.Map({
        phrase: "ketchup viable sport car man jungle coin green coat shoes web dog table jeans milk"
      })}
    />
    <ui.Buttons.BasicButton
      title="Cancel Creation"
      onPress={() => {}}
      style={{
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        flex: 1,
        marginBottom: 50,
      }}
    />
    <ui.InfoBlock/>
  </div>
);

export default SaveBackupPhraseScreen;
