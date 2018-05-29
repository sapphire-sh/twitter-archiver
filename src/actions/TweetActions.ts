import {
	Dispatch,
} from 'redux';

import {
	TweetKeys,
	TweetInvalidateAction,
	TweetRequestAction,
	TweetReceiveAction,
} from './types/TweetActionTypes';

import {
	State,
} from '../reducers';

import {
	Tweet,
} from '../models';

import {
	fetchGet,
} from '../helpers';

export function invalidateTweets(): TweetInvalidateAction {
	return {
		'type': TweetKeys.INVALIDATE_TWEETS,
	};
}

function requestTweets(): TweetRequestAction {
	return {
		'type': TweetKeys.REQUEST_TWEETS,
	};
}

function receiveTweets(tweets: Tweet[]): TweetReceiveAction {
	return {
		'type': TweetKeys.RECEIVE_TWEETS,
		'tweets': tweets,
	};
}

function fetchTweets() {
	return (dispatch: Dispatch<any>) => {
		dispatch(requestTweets());

		return fetchGet(`/api/tweets/1`).then((tweets: Tweet[]) => {
			return dispatch(receiveTweets(tweets));
		}).catch((err) => {
			console.log(err);
		});
	};
}

function shouldFetchTweets(state: State) {
	return state.tweet.didInvalidate;
}

export function fetchTweetsIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		if(shouldFetchTweets(getState())) {
			dispatch(fetchTweets());
		}
	};
}
