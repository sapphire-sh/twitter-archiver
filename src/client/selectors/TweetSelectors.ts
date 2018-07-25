import {
	createSelector,
} from 'reselect';

import {
	State,
} from '../reducers';

const getState = (state: State) => {
	return state.tweet;
};

export const getDidInvalidateTweets = createSelector([
	getState,
], (state) => {
	return state.didInvalidate;
});

export const getIsFetchingTweets = createSelector([
	getState,
], (state) => {
	return state.isFetching;
});

export const getTweets = createSelector([
	getState,
], (state) => {
	return state.tweets;
});

export const getLastTweetID = createSelector([
	getTweets,
], (tweets) => {
	if(tweets.length === 0) {
		return null;
	}
	return tweets[tweets.length - 1].id_str;
});
