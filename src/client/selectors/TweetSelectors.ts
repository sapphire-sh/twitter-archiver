import {
	createSelector,
} from 'reselect';

import {
	State,
} from '../reducers';

const getState = (state: State) => {
	return state.tweet;
};

// TODO use reselect
export const getTweetsDidInvalidate = createSelector([
	getState,
], (state) => {
	return state.didInvalidate;
});

export const getTweetsIsFetching = createSelector([
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
