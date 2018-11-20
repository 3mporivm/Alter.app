import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from "recompose";
import { ui } from 'components';
import iconCopy from 'assets/img/copy.svg';

import './style.scss';

const AddressCard = ({
  icon,
  setRefInput,
  onCopy,
  refInput,
}) => (
  <div className="address-card">
    <ui.Badge
      icon={icon}
      backgroundColor="#B076FF"
    />
    <div className="address-card__title">Wallet one</div>
    <label
      className="address-card__label"
      htmlFor="address_account"
    >
      Account address
    </label>
    <div className="address-card__field">
      <input
        ref={ref => setRefInput(ref)}
        id="address_account"
        value={"3LVGbddKk3uKhqfGKz7X7n6d5asdasdasdasdg"}
        onFocus={() => refInput.select()}
        readOnly
        className="address-card__field__input"
      />
      <img
        className="address-card__field__icon"
        src={iconCopy}
        alt=""
        onClick={() => {
          refInput.select();
          document.execCommand("Copy")
        }}
      />
    </div>
  </div>
);

AddressCard.propTypes = {
  icon: PropTypes.any.isRequired,
  setRefInput: PropTypes.func.isRequired,
  refInput: PropTypes.any,
};

AddressCard.defaultProps = {
  refInput: null,
};

export default compose(
  withStateHandlers(
    { refInput: null },
    {
      setRefInput: ({ refInput }) => ref => {
        if (refInput === null) {
          return ({ refInput: ref })
        }
      }
    }
  ),
)(AddressCard);

