import React from 'react';
import { Segment } from 'semantic-ui-react';
import { Tweet } from '~/shared/models';

interface ComponentProps {
  isFetchingTweets: boolean;
  tweets: Tweet[];
}

export class PlaceholderComponent extends React.Component<ComponentProps> {
  public render() {
    const { isFetchingTweets, tweets } = this.props;

    if (tweets.length === 0) {
      return <Segment>{isFetchingTweets ? 'loading...' : 'none'}</Segment>;
    } else {
      return null;
    }
  }
}
