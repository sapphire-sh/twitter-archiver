import {
	Dispatch,
} from 'redux';

import {
	FilterKeys,
	InvalidateFiltersAction,
	RequestMutedUsersAction,
	ReceiveMutedUsersAction,
	RequestBlockedUsersAction,
	ReceiveBlockedUsersAction,
} from './types/FilterActionTypes';

import {
	State,
} from '~/client/reducers';

import {
	getMutedUsers,
	getBlockedUsers,
} from '~/client/selectors';

import {
	User,
} from '~/shared/models';

import {
	sendRequest,
	RequestType,
} from '~/shared/helpers';

export function invalidateFilters(): InvalidateFiltersAction {
	return {
		'type': FilterKeys.INVALIDATE_FILTERS,
	};
}

function requestMutedUsers(): RequestMutedUsersAction {
	return {
		'type': FilterKeys.REQUEST_MUTED_USERS,
	};
}

function receiveMutedUsers(users: User[]): ReceiveMutedUsersAction {
	return {
		'type': FilterKeys.RECEIVE_MUTED_USERS,
		'mutedUsers': users,
	};
}

function fetchMutedUsers() {
	return async (dispatch: Dispatch<any>) => {
		dispatch(requestMutedUsers());

		try {
			const users = await sendRequest(RequestType.FETCH_MUTED_USERS);
			dispatch(receiveMutedUsers(users));
		}
		catch (err) {
			console.log(err);
		}
	};
}

function shouldFetchMutedUsers(state: State) {
	return getMutedUsers(state).length === 0;
}

export function fetchMutedUsersIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if (shouldFetchMutedUsers(state)) {
			dispatch(fetchMutedUsers());
		}
	};
}

function requestBlockedUsers(): RequestBlockedUsersAction {
	return {
		'type': FilterKeys.REQUEST_BLOCKED_USERS,
	};
}

function receiveBlockedUsers(users: User[]): ReceiveBlockedUsersAction {
	return {
		'type': FilterKeys.RECEIVE_BLOCKED_USERS,
		'blockedUsers': users,
	};
}

function fetchBlockedUsers() {
	return async (dispatch: Dispatch<any>) => {
		dispatch(requestBlockedUsers());

		try {
			const users = await sendRequest(RequestType.FETCH_BLOCKED_USERS);
			dispatch(receiveBlockedUsers(users));
		}
		catch (err) {
			console.log(err);
		}
	};
}

function shouldFetchBlockedUsers(state: State) {
	return getBlockedUsers.length === 0;
}

export function fetchBlockedUsersIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if (shouldFetchBlockedUsers(state)) {
			dispatch(fetchBlockedUsers());
		}
	};
}
