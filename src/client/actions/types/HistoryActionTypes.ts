import {
	Action,
} from 'redux';

export enum HistoryKeys {
	REQUEST_UPDATE_HISTORY = 'REQUEST_UPDATE_HISTORY',
	RECEIVE_UPDATE_HISTORY = 'RECEIVE_UPDATE_HISTORY',
}

export interface HistoryUpdateRequestAction extends Action {
	type: HistoryKeys.REQUEST_UPDATE_HISTORY;
}

export interface HistoryUpdateReceiveAction extends Action {
	type: HistoryKeys.RECEIVE_UPDATE_HISTORY;
	historyID: string;
}

export type HistoryAction = (
	| HistoryUpdateRequestAction
	| HistoryUpdateReceiveAction
);
