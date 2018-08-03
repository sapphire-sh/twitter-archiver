import {
	StatsKeys,
	StatsAction,
} from '../actions/types';

export interface StatsState {
	queueCount: number;
}

const initialState: StatsState = {
	'queueCount': 0,
};

export function stats(state = initialState, action: StatsAction): StatsState {
	switch(action.type) {
	case StatsKeys.UPDATE_QUEUE_COUNT:
		return {
			...state,
			'queueCount': action.queueCount,
		};
	default:
		return state;
	}
}
