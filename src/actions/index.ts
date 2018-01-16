import {
	Action,
	Dispatch,
} from 'redux';

import {
	Tweet,
} from '../models';

import {
	State,
} from '../reducers';

import {
	dateToString,
} from '../utils/date';

import fetch from '../utils/fetch';

export enum DateKeys {
	INVALIDATE_DATE = 'INVALIDATE_DATE',
	UPDATE_DATE = 'UPDATE_DATE',
};

export enum TweetKeys {
	INVALIDATE_TWEETS = 'INVALIDATE_TWEETS',
	REQUEST_TWEETS = 'REQUEST_TWEETS',
	RECEIVE_TWEETS = 'RECEIVE_TWEETS',
};

export interface DateInvalidateAction extends Action {
	type: DateKeys.INVALIDATE_DATE;
};

export interface DateUpdateAction extends Action {
	type: DateKeys.UPDATE_DATE;
	date: Date;
};

export interface TweetInvalidateAction extends Action {
	type: TweetKeys.INVALIDATE_TWEETS;
};

export interface TweetRequestAction extends Action {
	type: TweetKeys.REQUEST_TWEETS;
};

export interface TweetReceiveAction extends Action {
	type: TweetKeys.RECEIVE_TWEETS;
	date: Date;
	tweets: Tweet[];
}

export type DateAction =
	| DateInvalidateAction
	| DateUpdateAction;

export type TweetAction =
	| TweetInvalidateAction
	| TweetRequestAction
	| TweetReceiveAction;

export function invalidateDate(): DateInvalidateAction {
	return {
		'type': DateKeys.INVALIDATE_DATE,
	};
}

export function updateDate(date: Date): DateUpdateAction {
	return {
		'type': DateKeys.UPDATE_DATE,
		'date': date,
	};
}

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

		return fetch.get(`/api/tweets/${dateTime}`).then((tweets: Tweet[]) => {
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
