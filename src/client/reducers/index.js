'use strict';

import {
	combineReducers
} from 'redux';
import {
	INVALIDATE_DATE,
	UPDATE_DATE,
	INVALIDATE_TWEETS,
	REQUEST_TWEETS,
	RECEIVE_TWEETS,
} from '../actions';

function date(state = {
	didInvalidate: false,
	date: new Date()
}, action) {
	switch(action.type) {
	case INVALIDATE_DATE:
		return Object.assign({}, state, {
			didInvalidate: true
		});
	case UPDATE_DATE:
		return Object.assign({}, state, {
			didInvalidate: false,
			date: action.date
		});
	default:
		return state;
	}
}

function tweets(state = {
	isFetching: false,
	didInvalidate: false,
	tweets: {}
}, action) {
	switch(action.type) {
	case INVALIDATE_TWEETS:
		return Object.assign({}, state, {
			didInvalidate: true
		});
	case REQUEST_TWEETS:
		return Object.assign({}, state, {
			isFetching: true,
			didInvalidate: false
		});
	case RECEIVE_TWEETS:
		return Object.assign({}, state, {
			isFetching: false,
			didInvalidate: false,
			tweets: action.tweets
		});
	default:
		return state;
	}
}

const reducers = combineReducers({
	date,
	tweets
});

export default reducers;
