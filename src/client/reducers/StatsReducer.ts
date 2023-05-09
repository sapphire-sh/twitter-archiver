import {
	StatsKeys,
	StatsAction,
} from '~/client/actions/types';
import { Tweet } from '~/shared/models';

export interface StatsState {
	queueCount: number;
	lastTweet: Tweet | null;
}

const initialState: StatsState = {
	'queueCount': 0,
	'lastTweet': null,
};

export function stats(state = initialState, action: StatsAction): StatsState {
	switch (action.type) {
	case StatsKeys.UPDATE_QUEUE_COUNT:
		return {
			...state,
			'queueCount': action.queueCount,
		};
	case StatsKeys.UPDATE_LAST_TWEET: {
		return {
			...state,
			'lastTweet': action.lastTweet,
		}
	}
	default:
		return state;
	}
}
