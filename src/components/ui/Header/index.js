import React from 'react';
import PropTypes from 'prop-types';

import iconTelegram from 'assets/img/telegram.svg';
import iconTwitter from 'assets/img/twitter.svg';
import iconGithub from 'assets/img/github.svg';

import './style.scss';

const InfoBlock = ({}) => (
  <div class="header">
    <div class="header__block"/>
  </div>
);

InfoBlock.propTypes = {
  onPressNewPoll: PropTypes.func,
  name: PropTypes.string,
  picture: PropTypes.string,
  pollsCount: PropTypes.number.isRequired,
  isAuthorized: PropTypes.bool,
  isJoined: PropTypes.bool,
  onButtonPress: PropTypes.func.isRequired,
};

export default InfoBlock;
