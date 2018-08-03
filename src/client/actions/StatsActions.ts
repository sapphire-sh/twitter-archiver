import {
	StatsKeys,
	UpdateQueueCountAction,
} from './types/StatsActionTypes';

export function updateQueueCount(count: number): UpdateQueueCountAction {
	return {
		'type': StatsKeys.UPDATE_QUEUE_COUNT,
		'queueCount': count,
	};
}
