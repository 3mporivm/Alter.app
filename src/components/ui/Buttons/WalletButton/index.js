import React from 'react';
import PropTypes from 'prop-types';
import iconArrowRight from 'assets/img/arrow-right.svg';

import './style.scss';

const WalletButton = ({
  icon,
  backgroundColor,
  name,
  fullName,
  wallets,
  balance,
  balanceUSD,
  onPress,
}) => (
  <button onClick={onPress} className="wallet-button">
    <div className="wallet-button__left-border"/>
    <div
      className="wallet-button__icon-wrapper"
      style={{ backgroundColor }}
    >
      <img
        className="wallet-button__icon"
        src={icon}
        alt=""
      />
    </div>
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
        <div className="wallet-button__content__footer__wallet-full-name">
          {fullName}
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
  backgroundColor: PropTypes.string,
  styleImg: PropTypes.any,
  wallets: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  balanceUSD: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

WalletButton.defaultProps = {
  backgroundColor: "#B076FF",
};

export default WalletButton;
