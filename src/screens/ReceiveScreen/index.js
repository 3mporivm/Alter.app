import React from 'react';
import PropTypes from "prop-types";
import {compose, getContext, withHandlers, withProps} from "recompose";
import { ui, forms, modals } from 'components';

import 'assets/screens.scss';
import './style.scss';

const ReceiveScreen = ({
  onCoin,
  onSettings,
  onBack,
  currency,
}) => (
  <div className="receive-screen-layout">
    {
      console.log("currency", currency)
    }
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={`Receive ${currency.toUpperCase()}`}
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
  currency: PropTypes.string.isRequired,
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
    currency: _.get(location, 'state.currency', ''),
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
