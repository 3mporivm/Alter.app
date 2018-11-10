import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { ui } from 'components';
import apiHOCs from 'components/apiHOCs';

import 'assets/screens.scss';
import './style.scss';

const GetStartedScreen = ({ redditPosts }) => (
  <div class="get-started-layout">
    <div class="get-started-layout__title">alter.app</div>
    <ui.Buttons.NextButton
      title="Get Started"
      onPress={() => {}}
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
};

export default compose(
  apiHOCs.RedditApiHOC(),

  lifecycle({
    componentDidMount() {
      this.props.getReddit({ redditName: 'reactjs' });
    }
  })
)(GetStartedScreen);
