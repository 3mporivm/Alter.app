import React from 'react';
import PropTypes from 'prop-types';

import iconReceive from 'assets/img/receive.svg';
import iconSend from 'assets/img/send.svg';

import './style.scss';

const Transaction = ({
  type,
  address,
  sum,
  date,
}) => (
  <div className="transaction">
    <div
      className="transaction__icon-wrapper"
      style={{
        backgroundColor: `rgba(${type === "Sent" ? "176, 118" : "99, 206"}, 255, 0.2)`
      }}
    >
      <img
        className="transaction__icon"
        src={type === "Sent" ? iconSend : iconReceive}
        alt=""
      />
    </div>
    <div className="transaction__content">
      <div className="transaction__content__header">
        <span className="transaction__content__header__type">
          {type}
        </span>
        <span
          className="transaction__content__header__sum"
          style={{
            color: type === "Sent" ? "#B076FF" : "#63CEFF"
          }}
        >
          { type === "Sent" ? "- " : "+ "}
          {sum}
        </span>
      </div>
      <div className="transaction__content__footer">
        <span className="transaction__content__footer__address">
          {address}
        </span>
        <span className="transaction__content__footer__date">
          {date}
        </span>
      </div>
    </div>
  </div>
);

Transaction.propTypes = {
  type: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
};

Transaction.defaultProps = {};

export default Transaction;
