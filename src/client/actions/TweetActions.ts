import { Dispatch } from 'redux';
import { State } from '~/client/reducers';
import { getDidInvalidateTweets, getIsFetchingTweets, getLatestTweetID } from '~/client/selectors';
import { RequestType, sendRequest } from '~/shared/helpers';
import { Tweet } from '~/shared/models';
import {
  InvalidateTweetAction,
  ReceiveTweetsAction,
  RequestTweetsAction,
  TweetKeys,
  UpdateLatestTweetID,
} from './types/TweetActionTypes';

export function invalidateTweets(): InvalidateTweetAction {
  return {
    type: TweetKeys.INVALIDATE_TWEETS,
  };
}

function requestTweets(): RequestTweetsAction {
  return {
    type: TweetKeys.REQUEST_TWEETS,
  };
}

function receiveTweets(tweets: Tweet[]): ReceiveTweetsAction {
  return {
    type: TweetKeys.RECEIVE_TWEETS,
    tweets,
  };
}

function fetchTweets() {
  return async (dispatch: Dispatch<any>) => {
    dispatch(requestTweets());

    try {
      const tweets: Tweet[] = await sendRequest(RequestType.FETCH_TWEETS);
      dispatch(receiveTweets(tweets));
    } catch (err) {
      console.log(err);
    }
  };
}

function shouldFetchTweets(state: State) {
  const didInvalidate = getDidInvalidateTweets(state);
  const isFetching = getIsFetchingTweets(state);

  return didInvalidate === true && isFetching === false;
}

export function fetchTweetsIfNeeded() {
  return (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();

    if (shouldFetchTweets(state)) {
      dispatch(fetchTweets());
    }
  };
}

function updateLatestTweetID(id: string): UpdateLatestTweetID {
  return {
    type: TweetKeys.UPDATE_LATEST_TWEET_ID,
    latestTweetID: id,
  };
}

function shouldUpdateLatestTweetID(state: State, id: string) {
  return getLatestTweetID(state) !== id;
}

export function updateLatestTweetIDIfNeeded(id: string) {
  return (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();

    if (shouldUpdateLatestTweetID(state, id)) {
      dispatch(updateLatestTweetID(id));
      dispatch(invalidateTweets());
      dispatch(fetchTweetsIfNeeded());
    }
  };
}
