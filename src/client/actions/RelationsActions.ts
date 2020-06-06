import {
	Dispatch,
	AnyAction,
} from 'redux';

import {
	RelationsKeys,
	RequestFollowingUsersAction,
	ReceiveFollowingUsersAction,
	RequestFollowerUsersAction,
	ReceiveFollowerUsersAction,
} from './types/RelationsActionTypes';

import {
	State,
} from '~/client/reducers';

import {
	getFollowingUsers,
	getFollowerUsers,
} from '~/client/selectors';

import {
	User,
} from '~/shared/models';

import {
	sendRequest,
	RequestType,
} from '~/shared/helpers';

function requestFollowingUsers(): RequestFollowingUsersAction {
	return {
		'type': RelationsKeys.REQUEST_FOLLOWING_USERS,
	};
}

function receiveFollowingUsers(users: User[]): ReceiveFollowingUsersAction {
	return {
		'type': RelationsKeys.RECEIVE_FOLLOWING_USERS,
		'followingUsers': users,
	};
}

function fetchFollowingUsers() {
	return async (dispatch: Dispatch<AnyAction>) => {
		dispatch(requestFollowingUsers());

		try {
			const users = await sendRequest(RequestType.FETCH_FOLLOWING_USERS);
			dispatch(receiveFollowingUsers(users));
		}
		catch (err) {
			console.log(err);
		}
	};
}

function shouldFetchFollowingUsers(state: State) {
	return getFollowingUsers(state) === null;
}

export function fetchFollowingUsersIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if (shouldFetchFollowingUsers(state)) {
			dispatch(fetchFollowingUsers());
		}
	};
}

function requestFollowerUsers(): RequestFollowerUsersAction {
	return {
		'type': RelationsKeys.REQUEST_FOLLOWER_USERS,
	};
}

function receiveFollowerUsers(users: User[]): ReceiveFollowerUsersAction {
	return {
		'type': RelationsKeys.RECEIVE_FOLLOWER_USERS,
		'followerUsers': users,
	};
}

function fetchFollowerUsers() {
	return async (dispatch: Dispatch<AnyAction>) => {
		dispatch(requestFollowerUsers());

		try {
			const users = await sendRequest(RequestType.FETCH_FOLLOWER_USERS);
			dispatch(receiveFollowerUsers(users));
		}
		catch (err) {
			console.log(err);
		}
	};
}

function shouldFetchFollowerUsers(state: State) {
	return getFollowerUsers(state) === null;
}

export function fetchFollowerUsersIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if (shouldFetchFollowerUsers(state)) {
			dispatch(fetchFollowerUsers());
		}
	};
}
