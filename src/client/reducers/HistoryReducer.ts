import {
	HistoryKeys,
	HistoryAction,
} from '../actions/types';

export interface HistoryState {
	historyID: string;
}

const initialState: HistoryState = {
	'historyID': '',
};

export function history(state = initialState, action: HistoryAction): HistoryState {
	switch(action.type) {
	case HistoryKeys.REQUEST_UPDATE_HISTORY:
		return state;
	case HistoryKeys.RECEIVE_UPDATE_HISTORY:
		return {
			...state,
			'historyID': action.historyID,
		};
	default:
		return state;
	}
}
