import {
	Action,
} from 'redux';

import {
	User,
} from '~/shared/models';

export enum RelationsKeys {
	REQUEST_FOLLOWING_USERS = 'REQUEST_FOLLOWING_USERS',
	RECEIVE_FOLLOWING_USERS = 'RECEIVE_FOLLOWING_USERS',
	REQUEST_FOLLOWER_USERS = 'REQUEST_FOLLOWER_USERS',
	RECEIVE_FOLLOWER_USERS = 'RECEIVE_FOLLOWER_USERS',
}

export interface RequestFollowingUsersAction extends Action {
	type: RelationsKeys.REQUEST_FOLLOWING_USERS;
}

export interface ReceiveFollowingUsersAction extends Action {
	type: RelationsKeys.RECEIVE_FOLLOWING_USERS;
	followingUsers: User[];
}

export interface RequestFollowerUsersAction extends Action {
	type: RelationsKeys.REQUEST_FOLLOWER_USERS;
}

export interface ReceiveFollowerUsersAction extends Action {
	type: RelationsKeys.RECEIVE_FOLLOWER_USERS;
	followerUsers: User[];
}

export type RelationsAction = (
	| RequestFollowingUsersAction
	| ReceiveFollowingUsersAction
	| RequestFollowerUsersAction
	| ReceiveFollowerUsersAction
);
