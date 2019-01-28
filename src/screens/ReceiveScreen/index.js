import React from 'react';
import PropTypes from 'prop-types';
import { compose, getContext, withHandlers, withProps, lifecycle } from 'recompose';
import get from 'lodash/get';
import { ui, forms, modals } from 'components';

import './style.scss';

const ReceiveScreen = ({
  onCoin,
  onSettings,
  onBack,
  wallet,
}) => (
  <div className="receive-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={`Receive ${wallet.coin.toUpperCase()}`}
    />
    <forms.ReceiveForm
      onSubmit={() => {}}
      initialValues={{
        amount: wallet.balance,
        code: wallet.address,
      }}
      code={wallet.address}
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
    wallet: get(location, 'state.wallet') || JSON.parse(window.localStorage.getItem('wallet')),
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
  }),
  lifecycle({
    componentDidMount() {
      // сохраняем пропы в local storage
      window.localStorage.setItem('lastPath', '/receive');
      if (this.props.wallet) {
        window.localStorage.setItem('wallet', JSON.stringify(this.props.wallet));
      }
    },
  }),
)(ReceiveScreen);
