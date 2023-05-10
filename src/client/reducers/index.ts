import { combineReducers } from 'redux';
import { filter, FilterState } from './FilterReducer';
import { history, HistoryState } from './HistoryReducer';
import { modal, ModalState } from './ModalReducer';
import { relations, RelationsState } from './RelationsReducer';
import { search, SearchState } from './SearchReducer';
import { socket, SocketState } from './SocketReducer';
import { stats, StatsState } from './StatsReducer';
import { tweet, TweetState } from './TweetReducer';

export interface State {
  filterState: FilterState;
  historyState: HistoryState;
  modalState: ModalState;
  relationsState: RelationsState;
  searchState: SearchState;
  socketState: SocketState;
  statsState: StatsState;
  tweetState: TweetState;
}

export const reducers = combineReducers<State>({
  filterState: filter,
  historyState: history,
  modalState: modal,
  relationsState: relations,
  searchState: search,
  socketState: socket,
  statsState: stats,
  tweetState: tweet,
});
