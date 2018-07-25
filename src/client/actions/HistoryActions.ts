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
	sendRequest,
	RequestType,
} from '../../shared/helpers';

function requestHistoryUpdate(): HistoryUpdateRequestAction {
	return {
		'type': HistoryKeys.REQUEST_UPDATE_HISTORY,
	};
}

function receiveHistoryUpdate(): HistoryUpdateReceiveAction {
	return {
		'type': HistoryKeys.RECEIVE_UPDATE_HISTORY,
	};
}

export function updateHistory(id: string) {
	return (dispatch: Dispatch<any>) => {
		dispatch(requestHistoryUpdate());

		sendRequest(RequestType.UPDATE_HISTORY, {
			'id': id,
		}).then((res) => {
			dispatch(receiveHistoryUpdate());
			dispatch(invalidateTweets());
			dispatch(fetchTweetsIfNeeded());
		}).catch((err) => {
			console.log(err);
		});
	}
}
