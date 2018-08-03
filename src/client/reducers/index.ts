import {
	combineReducers,
} from 'redux';

import {
	history,
	HistoryState,
} from './HistoryReducer';

import {
	tweet,
	TweetState,
} from './TweetReducer';

export interface State {
	historyState: HistoryState;
	tweetState: TweetState;
}

export const reducers = combineReducers<State>({
	'historyState': history,
	'tweetState': tweet,
});
