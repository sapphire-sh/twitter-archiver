import {
	FilterKeys,
	FilterAction,
} from '~/client/actions/types';

import {
	User,
} from '~/shared/models';

export interface FilterState {
	mutedUsers: User[];
	blockedUsers: User[];
}

const initialState: FilterState = {
	'mutedUsers': [],
	'blockedUsers': [],
};

export function filter(state = initialState, action: FilterAction): FilterState {
	switch (action.type) {
	case FilterKeys.INVALIDATE_FILTERS:
		return {
			...initialState,
		};
	case FilterKeys.RECEIVE_MUTED_USERS:
		return {
			...state,
			'mutedUsers': action.mutedUsers,
		};
	case FilterKeys.RECEIVE_BLOCKED_USERS:
		return {
			...state,
			'blockedUsers': action.blockedUsers,
		};
	case FilterKeys.REQUEST_MUTED_USERS:
	case FilterKeys.REQUEST_BLOCKED_USERS:
	default:
		return state;
	}
}
