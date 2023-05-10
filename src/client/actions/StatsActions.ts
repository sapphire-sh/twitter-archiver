import { Dispatch } from 'redux';
import { RequestType, sendRequest } from '~/shared/helpers';
import { Tweet } from '~/shared/models';
import { StatsKeys, UpdateLastTweetAction, UpdateQueueCountAction } from './types/StatsActionTypes';

export function updateQueueCount(count: number): UpdateQueueCountAction {
  return {
    type: StatsKeys.UPDATE_QUEUE_COUNT,
    queueCount: count,
  };
}

export const updateLastTweet = (lastTweet: Tweet | null): UpdateLastTweetAction => {
  return {
    type: StatsKeys.UPDATE_LAST_TWEET,
    lastTweet,
  };
};

export const fetchStats = () => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const stats: {
        lastTweet: Tweet | null;
      } = await sendRequest(RequestType.FETCH_STATS);
      dispatch(updateLastTweet(stats.lastTweet));
    } catch (err) {
      console.log(err);
    }
  };
};
