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
	getTweetsDidInvalidate,
	getTweetsIsFetching,
	getLastTweetID,
} from '../selectors';

import {
	Tweet,
} from '../../shared/models';

import {
	sendRequest,
	RequestType,
} from '../../shared/helpers';

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

function fetchTweets(lastTweetID: string | null) {
	return (dispatch: Dispatch<any>) => {
		dispatch(requestTweets());

		return sendRequest(RequestType.FETCH_TWEET, {
			lastTweetID,
		}).then((tweets: Tweet[]) => {
			dispatch(receiveTweets(tweets));
		}).catch((err) => {
			console.log(err);
		});
	};
}

function shouldFetchTweets(state: State) {
	const didInvalidate = getTweetsDidInvalidate(state);
	const isFetching = getTweetsIsFetching(state);

	return didInvalidate === true && isFetching === false;
}

export function fetchTweetsIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state: State = getState();

		if(shouldFetchTweets(state)) {
			const lastTweetID = getLastTweetID(state);

			dispatch(fetchTweets(lastTweetID));
		}
	};
}
