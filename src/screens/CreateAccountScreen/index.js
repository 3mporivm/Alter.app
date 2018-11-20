import React from 'react';
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';
import {compose, getContext, withHandlers} from "recompose";
import PropTypes from "prop-types";

const CreateAccountScreen = ({
  onSubmit,
}) => (
  <div className="protect-account-layout">
    <ui.Header/>
    <forms.CreateAccountForm
      onSubmit={onSubmit}
      isFetching={false}
    />
    <ui.InfoBlock/>
  </div>
);

CreateAccountScreen.propTypes = {
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
        pathname: '/auth/account-name',
      });
    },
  })
)(CreateAccountScreen);
