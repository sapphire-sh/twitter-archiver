import {
	Action,
} from 'redux';
import { Tweet } from '~/shared/models';

export enum StatsKeys {
	UPDATE_QUEUE_COUNT = 'UPDATE_QUEUE_COUNT',
	UPDATE_LAST_TWEET = 'UPDATE_LAST_TWEET'
}

export interface UpdateQueueCountAction extends Action {
	type: StatsKeys.UPDATE_QUEUE_COUNT;
	queueCount: number;
}

export interface UpdateLastTweetAction extends Action {
	type: StatsKeys.UPDATE_LAST_TWEET;
	lastTweet: Tweet | null;
}

export type StatsAction = (
	| UpdateQueueCountAction
	| UpdateLastTweetAction
);
