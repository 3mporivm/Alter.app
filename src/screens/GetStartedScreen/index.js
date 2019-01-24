import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, getContext } from 'recompose';
import { ui, apiHOCs } from 'components';

import logo from '../../assets/img/logo.svg';

import './style.scss';

const GetStartedScreen = ({
  onGetStarted,
}) => (
  <div className="get-started-layout">
    <div className="get-started-layout__title">
      <img src={logo} alt="logo" className="get-started-layout__title__logo" />
      <div className="get-started-layout__title__text">
        <span className="get-started-layout__title__text__bold">
          alter
        </span>
        <span>
          .app
        </span>
      </div>
    </div>
    <ui.Buttons.NextButton
      title="Get Started"
      onPress={onGetStarted}
    />
  </div>
);

GetStartedScreen.propTypes = {
  redditPosts: PropTypes.any,
  onGetStarted: PropTypes.func.isRequired,
};

export default compose(
  getContext({
    router: PropTypes.shape({
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
  }),
  withHandlers({
    onGetStarted: ({ router }) => () => {
      router.history.push({
        pathname: '/auth/protect-account',
      });
    },
  }),
)(GetStartedScreen);
