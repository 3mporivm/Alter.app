import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, modals } from 'components';
import iconBitcoin from 'assets/img/bitcoin.svg';
import iconEthereum from 'assets/img/ethereum.svg';
import iconDash from 'assets/img/dash.svg';

import 'assets/screens.scss';
import './style.scss';

const SendScreen = ({
  currencies,
  onCoin,
  onSettings,
  onBack,
}) => (
  <div className="wallet-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title="Send BTC"
    />
    <forms.SendForm
      onChange={(value) => console.log(value.get('find_coin'))}
      initialValues={{
        amount: "0.17846838",
      }}
    />
    <ui.InfoBlock/>
  </div>
);

SendScreen.propTypes = {
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

SendScreen.defaultProps = {
};

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onBack: ({ router }) => () => {
      router.history.push('/wallet');
    },
    onCoin: ({ router }) => () => {
      router.history.push({
        pathname: '/coin',
      });
    },
    onSettings: ({ router }) => () => {
      router.history.push({
        pathname: '/settings',
      });
    },
  })
)(SendScreen);
