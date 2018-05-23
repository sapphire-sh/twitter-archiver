import {
	Action,
	Dispatch,
} from 'redux';

import {
	State,
} from '../reducers';

export enum DateKeys {
	INVALIDATE_DATE = 'INVALIDATE_DATE',
	UPDATE_DATE = 'UPDATE_DATE',
};

export interface DateInvalidateAction extends Action {
	type: DateKeys.INVALIDATE_DATE;
};

export interface DateUpdateAction extends Action {
	type: DateKeys.UPDATE_DATE;
	date: Date;
};

export type DateAction =
	| DateInvalidateAction
	| DateUpdateAction;

export function invalidateDate(): DateInvalidateAction {
	return {
		'type': DateKeys.INVALIDATE_DATE,
	};
}

export function updateDate(date: Date): DateUpdateAction {
	return {
		'type': DateKeys.UPDATE_DATE,
		'date': date,
	};
}

export * from './TweetActions';
