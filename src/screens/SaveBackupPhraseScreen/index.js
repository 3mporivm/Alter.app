import React from 'react';
import PropTypes from "prop-types";
import Immutable from "immutable";
import { compose, getContext, withHandlers } from "recompose";
import { ui, forms } from 'components';

import 'assets/screens.scss';
import './style.scss';

const SaveBackupPhraseScreen = ({
  onSubmit
}) => (
  <div className="save-backup-phrase-layout">
    <ui.Header/>
    <forms.SaveBackupPhraseForm
      onSubmit={onSubmit}
      isFetching={false}
      initialValues={Immutable.Map({
        phrase: "ketchup viable sport car man jungle coin green coat shoes web dog table jeans milk"
      })}
    />
    <ui.Buttons.TransparentButton
      title="Cancel Creation"
      onPress={() => {}}
      style={{ marginBottom: 50 }}
    />
    <ui.InfoBlock/>
  </div>
);

SaveBackupPhraseScreen.propTypes = {
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
        pathname: '/auth/confirm-backup',
      });
    },
  })
)(SaveBackupPhraseScreen);
