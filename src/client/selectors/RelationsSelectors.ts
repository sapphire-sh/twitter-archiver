import { createSelector } from 'reselect';
import { State } from '~/client/reducers';

const getState = (state: State) => {
  return state.relationsState;
};

export const getFollowingUsers = createSelector([getState], (state) => {
  return state.followingUsers;
});

export const getFollowerUsers = createSelector([getState], (state) => {
  return state.followerUsers;
});
