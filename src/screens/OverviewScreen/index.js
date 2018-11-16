import React from 'react';
import { ui, forms, modals } from 'components';
import iconBitcoin from 'assets/img/bitcoin.svg';

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
    <ui.BalanceBlock
      icon={iconBitcoin}
      backgroundColor="#F7931A"
      currency="TOTAL"
      balance="$26,808.00"
      course="1.23567815 BTC"
    />
    <forms.SearchForm
      onChange={(value) => console.log(value.get('find_coin'))}
    />
    <ui.InfoBlock/>
  </div>
);

export default OverviewScreen;
