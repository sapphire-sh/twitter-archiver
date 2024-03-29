import { Dispatch } from 'redux';
import { fetchTweetsIfNeeded, invalidateTweets } from '~/client/actions';
import { State } from '~/client/reducers';
import { getHistoryID } from '~/client/selectors';
import { RequestType, sendRequest } from '~/shared/helpers';
import { HistoryKeys, HistoryUpdateReceiveAction, HistoryUpdateRequestAction } from './types/HistoryActionTypes';

function requestHistoryUpdate(): HistoryUpdateRequestAction {
  return {
    type: HistoryKeys.REQUEST_UPDATE_HISTORY,
  };
}

function receiveHistoryUpdate(id: string): HistoryUpdateReceiveAction {
  return {
    type: HistoryKeys.RECEIVE_UPDATE_HISTORY,
    historyID: id,
  };
}

function updateHistory(id: string) {
  return async (dispatch: Dispatch<any>) => {
    dispatch(requestHistoryUpdate());

    try {
      await sendRequest(RequestType.UPDATE_HISTORY, {
        id,
      });

      window.scrollTo(0, 0);

      dispatch(receiveHistoryUpdate(id));
      dispatch(invalidateTweets());
      dispatch(fetchTweetsIfNeeded());
    } catch (err) {
      console.log(err);
    }
  };
}

function shouldUpdateHistory(state: State, id: string) {
  return getHistoryID(state) !== id;
}

export function updateHistoryIfNeeded(id: string) {
  return (dispatch: Dispatch<any>, getState: () => State) => {
    const state = getState();

    if (shouldUpdateHistory(state, id)) {
      dispatch(updateHistory(id));
    }
  };
}
