import {
	combineReducers,
} from 'redux';

import {
	tweet,
	TweetState,
} from './TweetReducer';

export interface State {
	tweet: TweetState;
}

export const reducers = combineReducers<State>({
	'tweet': tweet,
});
