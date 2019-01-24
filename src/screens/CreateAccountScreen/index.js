import React from 'react';
import PropTypes from "prop-types";
import { ui, forms, apiHOCs } from 'components';
import { compose, getContext, withHandlers } from "recompose";

import './style.scss';

const CreateAccountScreen = ({
  onSubmit,
  onBack,
}) => (
  <div className="protect-account-layout">
    <ui.Header onBackPress={onBack} />
    <forms.CreateAccountForm
      onSubmit={onSubmit}
      isFetching={false}
    />
  </div>
);

CreateAccountScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default compose(
  apiHOCs.ProfileApiHOC(),
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onSubmit: ({ router, updateProfile }) => (values) => {
      updateProfile({ avatar: values.get("avatar") });
      router.history.push({
        pathname: '/auth/account-name',
      });
    },
    onBack: ({ router }) => () => router.history.goBack(),
  }),
)(CreateAccountScreen);
