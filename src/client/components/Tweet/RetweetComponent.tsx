import React from 'react';
import { Segment } from 'semantic-ui-react';
import { openModal, updateHistoryIfNeeded } from '~/client/actions';
import { HeaderComponent, TweetComponent } from '~/client/components';
import { Tweet } from '~/shared/models';

interface ComponentProps {
  tweet: Tweet;
  retweet: Tweet;
  isRetweet: boolean;
  isQuote: boolean;

  updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
  openModal: typeof openModal;
}

export class RetweetComponent extends React.Component<ComponentProps> {
  public render() {
    const { tweet, retweet } = this.props;

    return (
      <div className="tweet retweet">
        <HeaderComponent {...this.props} isRetweet={false} />
        <Segment.Group size="tiny">
          <Segment>
            <TweetComponent {...this.props} tweet={retweet} />
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}
