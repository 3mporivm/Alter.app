import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const NetworkScreen = ({ onBack }) => (
  <div className="network-layout">
    <ui.Header
      onBackPress={onBack}
    />
    <forms.NetworkForm
      onSubmit={() => {}}
      isFetching={false}
      initialValues={{
        node_address: "https://nodes.wavesplatform.com/",
      }}
    />
  </div>
);

NetworkScreen.propTypes = {
  onBack: PropTypes.func.isRequired,
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
      router.history.push({
        pathname: '/settings',
      });
    },
  })
)(NetworkScreen);
