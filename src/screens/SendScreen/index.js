import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers, withProps, withState } from "recompose";
import { ui, forms, modals } from 'components';
import Immutable from 'immutable';
import iconSendWhite from 'assets/img/send-white.svg';
import { CURRENCY_ICONS } from 'constants/constants';

import './style.scss';

const SendScreen = ({
  currencies,
  onCoin,
  onSettings,
  onBack,
  setFooterModalOpen,
  confirmationSending,
  currency,
  balance,
}) => (
  <div className="send-screen-layout">
    <ui.Header
      onBackPress={onBack}
      isExtended
      onCenterPress={() => alert('onCenterPress')}
      onRightPress={onSettings}
      title={`Send ${currency.toUpperCase()}`}
    />
    <forms.SendForm
      onSubmit={(value) => setFooterModalOpen(value)}
      initialValues={{
        amount: "0.17846838",
      }}
      balance={balance}
      currency={currency.toUpperCase()}
    />
    {
      confirmationSending.get('amount') && <div className="header__hide-background"/>
    }
    {
      <modals.Footer
        icon={iconSendWhite}
        style={{ bottom: confirmationSending.get('amount') ? 0 : -500 }}
      >
        <ui.ConfirmationSending
          iconCurrency={CURRENCY_ICONS[name]}
          onCancel={() => setFooterModalOpen(Immutable.Map())}
          onSend={() => {}}
          values={confirmationSending}
        />
      </modals.Footer>
    }
    <ui.InfoBlock/>
  </div>
);

SendScreen.propTypes = {
  onCoin: PropTypes.func.isRequired,
  onSettings: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  setFooterModalOpen: PropTypes.func.isRequired,
  isFooterModalOpen: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default compose(
  withState('confirmationSending', 'setFooterModalOpen', Immutable.Map()),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withProps(({ location }) => ({
    currency: _.get(location, 'state.currency', ''),
    balance: _.get(location, 'state.balance', 0),
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
)(SendScreen);
