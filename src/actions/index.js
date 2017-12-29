import {
	dateToString,
} from '../utils/date';

import fetch from '../utils/fetch';

export const INVALIDATE_DATE = 'INVALIDATE_DATE';
export const UPDATE_DATE = 'UPDATE_DATE';
export const INVALIDATE_TWEETS = 'INVALIDATE_TWEETS';
export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

export function invalidateDate() {
	return {
		'type': INVALIDATE_DATE,
	};
}

export function updateDate(date) {
	return {
		'type': UPDATE_DATE,
		'date': date,
	};
}

export function invalidateTweets() {
	return {
		'type': INVALIDATE_TWEETS,
	};
}

function requestTweets() {
	return {
		'type': REQUEST_TWEETS,
	};
}

function receiveTweets(date, json) {
	return {
		'type': RECEIVE_TWEETS,
		'tweets': {
			[dateToString(date).substr(0, 13)]: json,
		},
	};
}

function fetchTweets(date) {
	return (dispatch) => {
		dispatch(requestTweets());

		return fetch.get(`/api/tweets/${dateToString(date).substr(0, 13).replace(/ /, '/')}`)
		.then((tweets) => {
			dispatch(receiveTweets(date, tweets));
		})
		.catch((err) => {
			console.log(err);
		});
	};
}

function shouldFetchTweets(state) {
	return state.tweets.didInvalidate;
}

export function fetchTweetsIfNeeded() {
	return (dispatch, getState) => {
		if(shouldFetchTweets(getState())) {
			const date = getState().date.date;
			return dispatch(fetchTweets(date));
		}
	};
}
