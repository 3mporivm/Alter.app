import React from 'react';
import PropTypes from 'prop-types';
import { ui } from 'components';
import iconPlusPurple from 'assets/img/plus_purple.svg';
import iconSelect from 'assets/img/select.svg';

import './style.scss';

const DropDown = ({
  onPress,
  title,
  isLoading,
  wallets,
}) => (
  <div className="dropdown">
    <div className="dropdown__wallets">
      {
        wallets.map(wallet => (
          <div className="dropdown__wallet">
            <span style={wallet.select && {color: 'black'}}>
              {wallet.name}
            </span>
            {
              wallet.select &&
              <img
                className="dropdown__wallet__icon"
                src={iconSelect}
                alt=""
              />
            }
          </div>
        ))
      }
    </div>
    <div className="dropdown__button-wrapper">
      <ui.Buttons.BasicButton
        title="Create Account"
        color="purple"
        onPress={() => {}}
        icon={iconPlusPurple}
      />
    </div>
  </div>
);

DropDown.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  wallets: PropTypes.array,
};

DropDown.defaultProps = {
  isLoading: false,
  title: "Continue",
  wallets: [
    {
      name: "Wallet 1",
      select: true,
    },
    {
      name: "Wallet 2"
    },
    {
      name: "Wallet 2"
    },
    {
      name: "Wallet 2"
    }
  ]
};

export default DropDown;
