import { createSelector } from 'reselect';
import { State } from '~/client/reducers';

const getState = (state: State) => {
  return state.tweetState;
};

export const getDidInvalidateTweets = createSelector([getState], (state) => {
  return state.didInvalidate;
});

export const getIsFetchingTweets = createSelector([getState], (state) => {
  return state.isFetching;
});

export const getTweets = createSelector([getState], (state) => {
  return state.tweets;
});

export const getLatestTweetID = createSelector([getState], (state) => {
  return state.latestTweetID;
});
