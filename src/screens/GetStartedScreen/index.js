import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle, withHandlers, getContext } from 'recompose';
import { ui, apiHOCs } from 'components';

import 'assets/screens.scss';
import './style.scss';

const GetStartedScreen = ({
  onGetStarted
}) => (
  <div className="get-started-layout">
    <div className="get-started-layout__title">alter.app</div>
    <ui.Buttons.NextButton
      title="Get Started"
      onPress={onGetStarted}
      style={{ marginBottom: 50 }}
    />
    <ui.InfoBlock/>
    {
      // redditPosts.map(post =>
      //   <div key={post.get('id')} style={{ marginTop: 50 }}>
      //     {post.get('title')}
      //   </div>
      // ).toArray()
    }
  </div>
);

GetStartedScreen.propTypes = {
  redditPosts: PropTypes.any,
  onGetStarted: PropTypes.func.isRequired,
};

export default compose(
  apiHOCs.RedditApiHOC(),
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
  lifecycle({
    componentDidMount() {
      this.props.getReddit({ redditName: 'reactjs' });
    }
  })
)(GetStartedScreen);
