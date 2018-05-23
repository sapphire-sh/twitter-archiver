import {
	Action,
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
	dateToString,
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

function receiveTweets(date: Date, tweets: Tweet[]): TweetReceiveAction {
	return {
		'type': TweetKeys.RECEIVE_TWEETS,
		'date': date,
		'tweets': tweets,
	};
}

function fetchTweets(date: Date) {
	return (dispatch: Dispatch<any>) => {
		dispatch(requestTweets());

		const dateTime = dateToString(date).substr(0, 13).replace(/ /, '/');

		return fetchGet(`/api/tweets/${dateTime}`).then((tweets: Tweet[]) => {
			return dispatch(receiveTweets(date, tweets));
		}).catch((err) => {
			console.log(err);
		});
	};
}

function shouldFetchTweets(state: State) {
	return state.tweet.didInvalidate;
}

export function fetchTweetsIfNeeded() {
	return (dispatch: Dispatch<State>, getState: () => State) => {
		if(shouldFetchTweets(getState())) {
			const date = getState().date.date;
			dispatch(fetchTweets(date));
		}
	};
}
