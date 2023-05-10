import { createSelector } from 'reselect';
import { State } from '~/client/reducers';

const getState = (state: State) => {
  return state.filterState;
};

export const getMutedUsers = createSelector([getState], (state) => {
  return state.mutedUsers;
});

export const getBlockedUsers = createSelector([getState], (state) => {
  return state.blockedUsers;
});
