'use strict';

import fetch from 'isomorphic-fetch';

import {
	dateToString
} from '../helpers';

export const INVALIDATE_DATE = 'INVALIDATE_DATE';
export const UPDATE_DATE = 'UPDATE_DATE';
export const INVALIDATE_TWEETS = 'INVALIDATE_TWEETS';
export const REQUEST_TWEETS = 'REQUEST_TWEETS';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

export function invalidateDate() {
	return {
		type: INVALIDATE_DATE
	};
}

export function updateDate(date) {
	return {
		type: UPDATE_DATE,
		date: date
	};
}

export function invalidateTweets() {
	return {
		type: INVALIDATE_TWEETS
	};
}

function requestTweets() {
	return {
		type: REQUEST_TWEETS
	};
}

function receiveTweets(date, json) {
	return {
		type: RECEIVE_TWEETS,
		tweets: {
			[dateToString(date).substr(0, 13)]: json.map((data) => JSON.parse(data.data))
		}
	};
}

function fetchTweets(date) {
	return (dispatch) => {
		dispatch(requestTweets());

		return fetch(`/api/tweets/${dateToString(date).substr(0, 13).replace(/\ /, '/')}`)
		.then(res => res.json())
		.then(json => {
			dispatch(receiveTweets(date, json));
		});
	};
}

function shouldFetchTweets(state) {
	return state.tweets.didInvalidate;
}

export function fetchTweetsIfNeeded(date) {
	return (dispatch, getState) => {
		if(shouldFetchTweets(getState())) {
			return dispatch(fetchTweets(date));
		}
	};
}
