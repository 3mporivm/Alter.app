import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const CurrencyCard = ({
  icon,
  backgroundColor,
  name,
  fullName,
  wallets,
  course,
  courseUSD,
  onPress,
}) => (
  <div className="currency_card">
    <div className="currency_card__header">
      <div
        className="currency_card__header__badge"
        style={{ backgroundColor }}
      >
        <img
          className="currency_card__header__badge-image"
          src={icon}
          alt=""
        />
      </div>
      <div className="currency_card__header__right">
        <div className="currency_card__header__right-name">{name}</div>
        <div className="currency_card__header__right-full-name">{fullName}</div>
      </div>
    </div>
    <div className="currency_card__course">{course}</div>
    <div className="currency_card__course-usd">{`$${courseUSD}`}</div>
    <button onClick={onPress} className="currency_card__button">
      {`${wallets} wallets`}
    </button>
  </div>
);

CurrencyCard.propTypes = {
  icon: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string,
  styleImg: PropTypes.any,
  wallets: PropTypes.number.isRequired,
  course: PropTypes.number.isRequired,
  courseUSD: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

CurrencyCard.defaultProps = {
  backgroundColor: "#B076FF",
};

export default CurrencyCard;
