import {
	Dispatch,
} from 'redux';

import {
	HistoryKeys,
	HistoryUpdateRequestAction,
	HistoryUpdateReceiveAction,
} from './types/HistoryActionTypes';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

import {
	getHistoryID,
} from '../selectors';

import {
	sendRequest,
	RequestType,
} from '../../shared/helpers';

function requestHistoryUpdate(): HistoryUpdateRequestAction {
	return {
		'type': HistoryKeys.REQUEST_UPDATE_HISTORY,
	};
}

function receiveHistoryUpdate(id: string): HistoryUpdateReceiveAction {
	return {
		'type': HistoryKeys.RECEIVE_UPDATE_HISTORY,
		'historyID': id,
	};
}

function updateHistory(id: string) {
	return (dispatch: Dispatch<any>) => {
		dispatch(requestHistoryUpdate());

		sendRequest(RequestType.UPDATE_HISTORY, {
			'id': id,
		}).then((res) => {
			dispatch(receiveHistoryUpdate(id));
			dispatch(invalidateTweets());
			dispatch(fetchTweetsIfNeeded());
		}).catch((err) => {
			console.log(err);
		});
	};
}

function shouldUpdateHistory(state: State, id: string) {
	return getHistoryID(state) !== id;
}

export function updateHistoryIfNeeded(id: string) {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if(shouldUpdateHistory(state, id)) {
			dispatch(updateHistory(id));
		}
	};
}
