import {
	TweetKeys,
	TweetAction,
} from '../actions/types';

import {
	Tweet,
} from '../models';

export interface TweetState {
	isFetching: boolean;
	didInvalidate: boolean;
	tweets: Tweet[];
}

const initialState: TweetState = {
	'isFetching': false,
	'didInvalidate': false,
	'tweets': [],
};

export function tweet(state = initialState, action: TweetAction): TweetState {
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
