import { createSelector } from 'reselect';
import { State } from '~/client/reducers';

const getState = (state: State) => {
  return state.statsState;
};

export const getQueueCount = createSelector([getState], (state) => {
  return state.queueCount;
});

export const getLastTweet = createSelector([getState], (state) => state.lastTweet);
