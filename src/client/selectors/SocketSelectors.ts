import { createSelector } from 'reselect';
import { State } from '~/client/reducers';

const getState = (state: State) => {
  return state.socketState;
};

export const getIsSocketConnected = createSelector([getState], (state) => {
  return state.isConnected;
});
