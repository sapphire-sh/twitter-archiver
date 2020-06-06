import {
	SearchAction,
	SearchKeys,
} from '~/client/actions';

import {
	initialSearchQuery,
	SearchQuery,
	Tweet,
} from '~/shared/models';

export interface SearchState {
	searchQuery: SearchQuery;
	tweets: Tweet[];
}

const initialState: SearchState = {
	'searchQuery': {
		...initialSearchQuery,
	},
	'tweets': [],
};

export function search(state = initialState, action: SearchAction): SearchState {
	switch (action.type) {
	case SearchKeys.INVALIDATE_SEARCH_QUERY:
		return {
			...state,
			'searchQuery': {
				...initialSearchQuery,
			},
		};
	case SearchKeys.UPDATE_SEARCH_QUERY:
		return {
			...state,
			'searchQuery': action.searchQuery,
		};
	case SearchKeys.INVALIDATE_SEARCH_RESULT:
		return {
			...state,
			'tweets': [],
		};
	case SearchKeys.FETCH_SEARCH_RESULT_REQUEST:
		return state;
	case SearchKeys.FETCH_SEARCH_RESULT_RECEIVE:
		return {
			...state,
			'tweets': action.tweets,
		};
	default:
		return state;
	}
}
