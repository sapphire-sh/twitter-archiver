import {
	DateKeys,
	TweetKeys,
	DateAction,
	TweetAction,
} from '../actions';

import {
	Tweet,
} from '../models';

export interface DateState {
	didInvalidate: boolean;
	date: Date;
}

export interface TweetState {
	isFetching: boolean;
	didInvalidate: boolean;
	tweets: Tweet[];
}

function date(state: DateState = {
	'didInvalidate': false,
	'date': new Date(),
}, action: DateAction): DateState {
	switch(action.type) {
	case DateKeys.INVALIDATE_DATE:
		return {
			'didInvalidate': true,
			'date': new Date(),
		};
	case DateKeys.UPDATE_DATE:
		return {
			'didInvalidate': false,
			'date': action.date,
		};
	default:
		return state;
	}
}

function tweet(state: TweetState = {
	'isFetching': false,
	'didInvalidate': false,
	'tweets': [],
}, action: TweetAction): TweetState {
	switch(action.type) {
	case TweetKeys.INVALIDATE_TWEETS:
		return {
			'isFetching': false,
			'didInvalidate': true,
			'tweets': [],
		};
	case TweetKeys.REQUEST_TWEETS:
		return {
			'isFetching': true,
			'didInvalidate': false,
			'tweets': [],
		};
	case TweetKeys.RECEIVE_TWEETS:
		return {
			'isFetching': false,
			'didInvalidate': false,
			'tweets': action.tweets,
		};
	default:
		return state;
	}
}

export interface State {
	date: DateState;
	tweet: TweetState;
}

const reducers = {
	'date': date,
	'tweet': tweet,
};

export default reducers;
