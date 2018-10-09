import {
	createSelector,
} from 'reselect';

import {
	State,
} from '../reducers';

const getState = (state: State) => {
	return state.searchState;
};

export const getSearchQuery = createSelector([
	getState,
], (state) => {
	return state.searchQuery;
});

export const getSearchResult = createSelector([
	getState,
], (state) => {
	return state.tweets;
});
