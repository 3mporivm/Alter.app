import React from 'react';
import { ui, forms, modals } from 'components';

import 'assets/screens.scss';
import './style.scss';

const OverviewScreen = ({ }) => (
  <div className="wallet-screen-layout">
    <ui.Header
      isDropDown
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={() => alert('setting')}
      modal={
          <modals.DropDown
            onPress={() => {}}
          />
      }
      title="Wallet one"
    />

    <ui.InfoBlock/>
  </div>
);

export default OverviewScreen;
