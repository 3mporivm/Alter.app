import React from 'react';
import PropTypes from 'prop-types';
import Badge from '../Badge';

import './style.scss';
const BalanceBlock = ({
  icon,
  backgroundColor,
  currency,
  balance,
  course,
}) => (
  <div className="balance-block-wrapper">
    <div className="balance-block">
      <Badge
        icon={icon}
        backgroundColor={backgroundColor}
      />
      <div className="balance-block__title">
        {`${currency} BALANCE`}
      </div>
      <div className="balance-block__total">
        {balance}
      </div>
      <div className="balance-block__course">
        {course}
      </div>
    </div>
  </div>
);

BalanceBlock.propTypes = {
  icon: PropTypes.any.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  currency: PropTypes.string,
  balance: PropTypes.string.isRequired,
  course: PropTypes.string.isRequired,
  // name: PropTypes.string,
  // picture: PropTypes.string,
  // pollsCount: PropTypes.number.isRequired,
  // isAuthorized: PropTypes.bool,
  // isJoined: PropTypes.bool,
  // onButtonPress: PropTypes.func.isRequired,
};

BalanceBlock.defaultProps = {
  currency: '',
};

export default BalanceBlock;
