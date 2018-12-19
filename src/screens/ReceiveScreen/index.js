import React from 'react';
import PropTypes from "prop-types";
import {compose, getContext, withHandlers, withProps} from "recompose";
import { ui, forms, modals } from 'components';

import './style.scss';

const ReceiveScreen = ({
  onCoin,
  onSettings,
  onBack,
  wallet,
}) => (
  <div className="receive-screen-layout">
    {
      console.log("wallet", wallet)
    }
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={`Receive ${wallet.currencyName.toUpperCase()}`}
    />
    <forms.ReceiveForm
      onSubmit={() => {}}
      initialValues={{
        amount: wallet.balance,
        code: wallet.address,
      }}
    />
    <ui.InfoBlock/>
  </div>
);

ReceiveScreen.propTypes = {
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  wallet: PropTypes.object.isRequired,
};

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withProps(({ location }) => ({
    wallet: _.get(location, 'state.wallet', {}),
  })),
  withHandlers({
    onBack: ({ router }) => () => router.history.goBack(),
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
)(ReceiveScreen);
