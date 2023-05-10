import React from 'react';
import { Segment } from 'semantic-ui-react';
import { openModal, updateHistoryIfNeeded } from '~/client/actions';
import { RetweetComponent, TweetComponent } from '~/client/components';
import { Tweet } from '~/shared/models';

interface ComponentProps {
  tweet: Tweet;

  updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
  openModal: typeof openModal;
}

export class TweetElementComponent extends React.Component<ComponentProps> {
  public render() {
    const { tweet } = this.props;

    return (
      <Segment key={tweet.id_str} className="tweet-segment">
        {(() => {
          const retweet = tweet.retweeted_status;

          if (retweet === undefined) {
            return <TweetComponent {...this.props} isRetweet={false} isQuote={false} />;
          }
          return <RetweetComponent {...this.props} retweet={retweet} isRetweet={true} isQuote={false} />;
        })()}
      </Segment>
    );
  }
}
