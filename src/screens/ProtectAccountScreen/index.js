import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext , withHandlers } from "recompose";
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const ProtectAccountScreen = ({
  onSubmit,
}) => (
  <div className="protect-account-layout">
    <ui.Header/>
    <forms.ProtectAccountForm
      onSubmit={onSubmit}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

ProtectAccountScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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
    onSubmit: ({ router }) => () => {
      router.history.push({
        pathname: '/auth/account',
      });
    },
  })
)(ProtectAccountScreen);
