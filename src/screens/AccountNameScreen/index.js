import React from 'react';
import PropTypes from "prop-types";
import { compose, getContext, withHandlers, lifecycle } from "recompose";
import { ui, forms, apiHOCs } from 'components';

const AccountNameScreen = ({ onSubmit, onBack, }) => (
  <div className="account-name-layout">
    <ui.Header onBackPress={onBack} />
    <forms.AccountNameForm onSubmit={onSubmit}/>
  </div>
);

AccountNameScreen.propTypes = {
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
      updateProfile({ name: values.get("name") });
      router.history.push({
        pathname: '/auth/save-backup-phrase',
      });
    },
    onBack: ({ router }) => () => router.history.goBack(),
  }),
  lifecycle({
    componentWillMount() {
      window.localStorage.setItem('lastPath', '/auth/account-name');
    },
  }),
)(AccountNameScreen);
