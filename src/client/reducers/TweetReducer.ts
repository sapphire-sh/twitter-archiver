import {
	TweetKeys,
	TweetAction,
} from '~/client/actions/types';

import {
	Tweet,
} from '~/shared/models';

export interface TweetState {
	isFetching: boolean;
	didInvalidate: boolean;
	tweets: Tweet[];
	latestTweetID: string;
}

const initialState: TweetState = {
	'isFetching': false,
	'didInvalidate': true,
	'tweets': [],
	'latestTweetID': '',
};

export function tweet(state = initialState, action: TweetAction): TweetState {
	switch (action.type) {
	case TweetKeys.INVALIDATE_TWEETS:
		return {
			...state,
			'didInvalidate': true,
		};
	case TweetKeys.REQUEST_TWEETS:
		return {
			...state,
			'isFetching': true,
			'didInvalidate': false,
		};
	case TweetKeys.RECEIVE_TWEETS:
		return {
			...state,
			'isFetching': false,
			'didInvalidate': false,
			'tweets': action.tweets,
		};
	case TweetKeys.UPDATE_LATEST_TWEET_ID:
		return {
			...state,
			'latestTweetID': action.latestTweetID,
		};
	default:
		return state;
	}
}
