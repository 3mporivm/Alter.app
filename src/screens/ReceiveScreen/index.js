import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers, withState } from "recompose";
import { ui, forms, modals } from 'components';
import iconSendWhite from 'assets/img/send-white.svg';
import Immutable from 'immutable';

import 'assets/screens.scss';
import './style.scss';

const ReceiveScreen = ({
  currencies,
  onCoin,
  onSettings,
  onBack,
}) => (
  <div className="receive-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title="Receive BTC"
    />
    <forms.ReceiveForm
      onSubmit={() => {}}
      initialValues={{
        amount: "0.17846838",
        code: "3LVGbddKk3uKhqfGKz7X7n6dz7X7n6d78",
      }}
    />
    <ui.InfoBlock/>
  </div>
);

ReceiveScreen.propTypes = {
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

ReceiveScreen.defaultProps = {
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
)(ReceiveScreen);
