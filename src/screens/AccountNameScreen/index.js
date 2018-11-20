import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';
import PropTypes from "prop-types";
import {compose, getContext, withHandlers} from "recompose";

const AccountNameScreen = ({
  onSubmit,
}) => (
  <div className="account-name-layout">
    <ui.Header/>
    <forms.AccountNameForm
      onSubmit={onSubmit}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

AccountNameScreen.propTypes = {
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
        pathname: '/auth/save-backup-phrase',
      });
    },
  })
)(AccountNameScreen);
