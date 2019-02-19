import {
	RelationsKeys,
	RelationsAction,
} from '~/client/actions/types';

import {
	User,
} from '~/shared/models';

export interface RelationsState {
	followingUsers: User[];
	followerUsers: User[];
}

const initialState: RelationsState = {
	'followingUsers': [],
	'followerUsers': [],
};

export function relations(state = initialState, action: RelationsAction): RelationsState {
	switch(action.type) {
	case RelationsKeys.REQUEST_FOLLOWING_USERS:
		return {
			...state,
			'followingUsers': [],
		};
	case RelationsKeys.RECEIVE_FOLLOWING_USERS:
		return {
			...state,
			'followingUsers': action.followingUsers,
		};
	case RelationsKeys.REQUEST_FOLLOWER_USERS:
		return {
			...state,
			'followerUsers': [],
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
