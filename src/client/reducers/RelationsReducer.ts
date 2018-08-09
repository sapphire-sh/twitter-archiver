import {
	RelationsKeys,
	RelationsAction,
} from '../actions/types';

import {
	User,
} from '../../shared/models';

export interface RelationsState {
	followingUsers: User[];
	followerUsers: User[];
}

const initialState: RelationsState = {
	'followingUsers': null,
	'followerUsers': null,
};

export function relations(state = initialState, action: RelationsAction): RelationsState {
	switch(action.type) {
	case RelationsKeys.REQUEST_FOLLOWING_USERS:
		return {
			...state,
			'followingUsers': null,
		};
	case RelationsKeys.RECEIVE_FOLLOWING_USERS:
		return {
			...state,
			'followingUsers': action.followingUsers,
		};
	case RelationsKeys.REQUEST_FOLLOWER_USERS:
		return {
			...state,
			'followerUsers': null,
		};
	case RelationsKeys.RECEIVE_FOLLOWER_USERS:
		return {
			...state,
			'followerUsers': action.followerUsers,
		};
	default:
		return state;
	}
}
