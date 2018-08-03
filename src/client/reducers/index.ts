import {
	combineReducers,
} from 'redux';

import {
	history,
	HistoryState,
} from './HistoryReducer';

import {
	socket,
	SocketState,
} from './SocketReducer';

import {
	tweet,
	TweetState,
} from './TweetReducer';

export interface State {
	historyState: HistoryState;
	socketState: SocketState;
	tweetState: TweetState;
}

export const reducers = combineReducers<State>({
	'historyState': history,
	'socketState': socket,
	'tweetState': tweet,
});
