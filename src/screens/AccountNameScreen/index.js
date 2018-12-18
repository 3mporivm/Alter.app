import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms, apiHOCs } from 'components';

const AccountNameScreen = ({ onSubmit }) => (
  <div className="account-name-layout">
    <ui.Header/>
    <forms.AccountNameForm onSubmit={onSubmit}/>
  </div>
);

AccountNameScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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
      updateProfile({ name: values.get("name") });
      router.history.push({
        pathname: '/auth/save-backup-phrase',
      });
    },
  })
)(AccountNameScreen);
