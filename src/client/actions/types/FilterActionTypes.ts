import {
	Action,
} from 'redux';

import {
	User,
} from '~/shared/models';

export enum FilterKeys {
	INVALIDATE_FILTERS = 'INVALIDATE_FILTERS',
	REQUEST_MUTED_USERS = 'REQUEST_MUTED_USERS',
	RECEIVE_MUTED_USERS = 'RECEIVE_MUTED_USERS',
	REQUEST_BLOCKED_USERS = 'REQUEST_BLOCKED_USERS',
	RECEIVE_BLOCKED_USERS = 'RECEIVE_BLOCKED_USERS',
}

export interface InvalidateFiltersAction extends Action {
	type: FilterKeys.INVALIDATE_FILTERS;
}

export interface RequestMutedUsersAction extends Action {
	type: FilterKeys.REQUEST_MUTED_USERS;
}

export interface ReceiveMutedUsersAction extends Action {
	type: FilterKeys.RECEIVE_MUTED_USERS;
	mutedUsers: User[];
}

export interface RequestBlockedUsersAction extends Action {
	type: FilterKeys.REQUEST_BLOCKED_USERS;
}

export interface ReceiveBlockedUsersAction extends Action {
	type: FilterKeys.RECEIVE_BLOCKED_USERS;
	blockedUsers: User[];
}

export type FilterAction = (
	| InvalidateFiltersAction
	| RequestMutedUsersAction
	| ReceiveMutedUsersAction
	| RequestBlockedUsersAction
	| ReceiveBlockedUsersAction
);
