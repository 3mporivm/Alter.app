import React from 'react';
import { compose } from 'recompose';
import { ui } from 'components';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';

import iconNetwork from 'assets/img/network.svg';
import iconSave from 'assets/img/save.svg';

import { required } from 'validators';

import './style.scss';

const NetworkForm = ({
  handleSubmit,
  facebookLoginRequest,
  isFetching,
  invalid,
}) => (
  <form onSubmit={handleSubmit} className="network-form-wrapper">
    <div className="network-form">
      <ui.Badge
        icon={iconNetwork}
        backgroundColor="#B076FF"
      />
      <div className="network-form__title">
        Network
      </div>
      <Field
        validate={required}
        component={ui.Fields.CopyField}
        name="node_address"
        props={{
          inputId: 'node_address',
          styleWrapper: {
            marginTop: 20,
          },
          label: 'Node address',
        }}
      />
      <div className="network-form__background"/>
    </div>
    <ui.Buttons.BasicButton
      title="Save"
      color="purple"
      icon={iconSave}
      onPress={handleSubmit}
      isLoading={isFetching}
      isDisabled={invalid || isFetching}
      style={{ marginTop: 20 }}
    />
    <ui.Buttons.TransparentButton
      title="Set Default"
      style={{ marginTop: 20 }}
      onPress={() => {}}
    />
  </form>
);

NetworkForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};


NetworkForm.defaultProps = {
};


export default compose(
  reduxForm({
    form: 'networkForm',
  }),
)(NetworkForm);