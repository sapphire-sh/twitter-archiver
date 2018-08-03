import {
	createSelector,
} from 'reselect';

import {
	State,
} from '../reducers';

const getState = (state: State) => {
	return state.statsState;
};

export const getQueueCount = createSelector([
	getState,
], (state) => {
	return state.queueCount;
});
