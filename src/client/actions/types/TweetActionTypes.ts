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
	UPDATE_LATEST_TWEET_ID = 'UPDATE_LATEST_TWEET_ID',
}

export interface InvalidateTweetAction extends Action {
	type: TweetKeys.INVALIDATE_TWEETS;
}

export interface RequestTweetsAction extends Action {
	type: TweetKeys.REQUEST_TWEETS;
}

export interface ReceiveTweetsAction extends Action {
	type: TweetKeys.RECEIVE_TWEETS;
	tweets: Tweet[];
}

export interface UpdateLatestTweetID extends Action {
	type: TweetKeys.UPDATE_LATEST_TWEET_ID;
	latestTweetID: number;
}

export type TweetAction = (
	| InvalidateTweetAction
	| RequestTweetsAction
	| ReceiveTweetsAction
	| UpdateLatestTweetID
);
