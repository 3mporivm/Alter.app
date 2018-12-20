import React from 'react';
import PropTypes from 'prop-types';
import iconArrowRight from 'assets/img/arrow-right.svg';

import './style.scss';

const WalletButton = ({
  icon,
  name,
  address,
  balance,
  balanceUSD,
  onPress,
}) => (
  <button onClick={onPress} className="wallet-button">
    <div className="wallet-button__left-border"/>
    <img
      className="wallet-button__icon"
      src={icon}
      alt=""
    />
    <div className="wallet-button__content">
      <div className="wallet-button__content__header">
        <div className="wallet-button__content__header__wallet-name">
          {name}
        </div>
        <div className="wallet-button__content__header__wallet-balance">
          {balance}
        </div>
      </div>
      <div className="wallet-button__content__footer">
        <div className="wallet-button__content__footer__wallet-address">
          {address}
        </div>
        <div className="wallet-button__content__footer__wallet-balance-usd">
          {balanceUSD}
        </div>
      </div>
    </div>
    <img
      className="wallet-button__icon-arrow"
      src={iconArrowRight}
      alt=""
    />
  </button>
);

WalletButton.propTypes = {
  icon: PropTypes.any.isRequired,
  styleImg: PropTypes.any,
  balance: PropTypes.number.isRequired,
  balanceUSD: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default WalletButton;
