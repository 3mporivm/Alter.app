import React from 'react';
import PropTypes from 'prop-types';

import iconTelegram from 'assets/img/telegram.svg';
import iconTwitter from 'assets/img/twitter.svg';
import iconGithub from 'assets/img/github.svg';

import './style.scss';

const InfoBlock = ({}) => (
  <div className="info-block">
    <div>
      [alpha version /patch_0.1]
    </div>
    <div className="info-block__lastupdate">
      {'lastupdate 12/05/2018, '}
      <span className="info-block__checkupdates">
        checkupdates
      </span>
    </div>
    <div className="info-block__description">
      Alter.app - мультивалютный крипто-кошелек, дающий возможность
      взаимодействовать со сторонними сервисами, работающими
      с приемом и отдачей крипто-валют. Alter.app это совершенно
      новый взгляд на кошельки, мы будем совершенствовать кошелек
      каждый новый день. Дальше будет интересней, следите за нами
      в социальных сетях:
    </div>
    <div className="share-buttons">
      <img className="share-buttons__telegram" src={iconTelegram} alt=""/>
      <img className="share-buttons__twitter" src={iconTwitter} alt=""/>
      <img className="share-buttons__github" src={iconGithub} alt=""/>
    </div>
  </div>
);

InfoBlock.propTypes = {
  // onPressNewPoll: PropTypes.func,
  // name: PropTypes.string,
  // picture: PropTypes.string,
  // pollsCount: PropTypes.number.isRequired,
  // isAuthorized: PropTypes.bool,
  // isJoined: PropTypes.bool,
  // onButtonPress: PropTypes.func.isRequired,
};

export default InfoBlock;
