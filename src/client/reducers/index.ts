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
	stats,
	StatsState,
} from './StatsReducer';

import {
	tweet,
	TweetState,
} from './TweetReducer';

export interface State {
	historyState: HistoryState;
	socketState: SocketState;
	statsState: StatsState;
	tweetState: TweetState;
}

export const reducers = combineReducers<State>({
	'historyState': history,
	'socketState': socket,
	'statsState': stats,
	'tweetState': tweet,
});
