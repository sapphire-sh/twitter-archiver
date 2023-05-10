import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import { Segment } from 'semantic-ui-react';
import { fetchTweetsIfNeeded, invalidateTweets, openModal, updateHistoryIfNeeded } from '~/client/actions';
import { PlaceholderComponent, TweetElementComponent } from '~/client/components';
import { State } from '~/client/reducers';
import { getHistoryID, getIsFetchingTweets, getTweets } from '~/client/selectors';
import '~/client/styles/TimelineContainer.scss';
import '~/client/styles/TweetsComponent.scss';
import { Tweet } from '~/shared/models';

interface ComponentProps {
  isFetchingTweets: boolean;
  tweets: Tweet[];
  historyID: string;

  invalidateTweets: typeof invalidateTweets;
  fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
  updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
  openModal: typeof openModal;
}

class TimelineComponent extends React.Component<ComponentProps> {
  public componentDidMount() {
    this.props.invalidateTweets();
    this.props.fetchTweetsIfNeeded();
  }

  public render() {
    const { tweets, historyID } = this.props;

    if (tweets.length === 0) {
      return (
        <Segment.Group size="tiny">
          <Segment>
            <div>loading...</div>
          </Segment>
        </Segment.Group>
      );
    }

    return (
      <div id="timeline">
        <Segment.Group size="tiny">
          <PlaceholderComponent {...this.props} />
          {tweets
            .filter((tweet) => {
              return tweet.id_str >= historyID;
            })
            .map((tweet) => {
              return <TweetElementComponent key={tweet.id_str} tweet={tweet} {...this.props} />;
            })}
        </Segment.Group>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    tweets: getTweets(state),
    isFetchingTweets: getIsFetchingTweets(state),
    historyID: getHistoryID(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators(
    {
      invalidateTweets,
      fetchTweetsIfNeeded,
      updateHistoryIfNeeded,
      openModal,
    },
    dispatch
  );
}

export const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);
