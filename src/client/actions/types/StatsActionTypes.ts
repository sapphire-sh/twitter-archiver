import {
	Action,
} from 'redux';

export enum StatsKeys {
	UPDATE_QUEUE_COUNT = 'UPDATE_QUEUE_COUNT',
}

export interface UpdateQueueCountAction extends Action {
	type: StatsKeys.UPDATE_QUEUE_COUNT;
	queueCount: number;
}

export type StatsAction = (
	| UpdateQueueCountAction
);
