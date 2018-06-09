import {
	Action,
} from 'redux';

import {
	Tweet,
} from '../../../shared/models';

export enum TweetKeys {
	INVALIDATE_TWEETS = 'INVALIDATE_TWEETS',
	REQUEST_TWEETS = 'REQUEST_TWEETS',
	RECEIVE_TWEETS = 'RECEIVE_TWEETS',
}

export interface TweetInvalidateAction extends Action {
	type: TweetKeys.INVALIDATE_TWEETS;
}

export interface TweetRequestAction extends Action {
	type: TweetKeys.REQUEST_TWEETS;
}

export interface TweetReceiveAction extends Action {
	type: TweetKeys.RECEIVE_TWEETS;
	tweets: Tweet[];
}

export type TweetAction = (
	| TweetInvalidateAction
	| TweetRequestAction
	| TweetReceiveAction
);
