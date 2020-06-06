import {
	Action,
	Dispatch,
} from 'redux';

import {
	State,
} from '~/client/reducers';

import {
	getSearchQuery,
} from '~/client/selectors';

import {
	SearchQuery,
	Tweet,
} from '~/shared/models';

import {
	sendRequest,
	RequestType,
} from '~/shared/helpers';

export enum SearchKeys {
	INVALIDATE_SEARCH_QUERY = 'INVALIDATE_SEARCH_QUERY',
	UPDATE_SEARCH_QUERY = 'UPDATE_SEARCH_QUERY',
	INVALIDATE_SEARCH_RESULT = 'INVALIDATE_SEARCH_RESULT',
	FETCH_SEARCH_RESULT_REQUEST = 'FETCH_SEARCH_RESULT_REQUEST',
	FETCH_SEARCH_RESULT_RECEIVE = 'FETCH_SEARCH_RESULT_RECEIVE',
}

export interface InvalidateSearchQueryAction extends Action {
	type: SearchKeys.INVALIDATE_SEARCH_QUERY;
}

export interface UpdateSearchQueryAction extends Action {
	type: SearchKeys.UPDATE_SEARCH_QUERY;
	searchQuery: SearchQuery;
}

export interface InvalidateSearchResultAction extends Action {
	type: SearchKeys.INVALIDATE_SEARCH_RESULT;
}

export interface FetchSearchResultRequestAction extends Action {
	type: SearchKeys.FETCH_SEARCH_RESULT_REQUEST;
}

export interface FetchSearchResultReceiveAction extends Action {
	type: SearchKeys.FETCH_SEARCH_RESULT_RECEIVE;
	tweets: Tweet[];
}

export type SearchAction = (
	| InvalidateSearchQueryAction
	| UpdateSearchQueryAction
	| InvalidateSearchResultAction
	| FetchSearchResultRequestAction
	| FetchSearchResultReceiveAction
);

export function invalidateSearchQuery(): InvalidateSearchQueryAction {
	return {
		'type': SearchKeys.INVALIDATE_SEARCH_QUERY,
	};
}

function updateSearchQuery(searchQuery: SearchQuery): UpdateSearchQueryAction {
	return {
		'type': SearchKeys.UPDATE_SEARCH_QUERY,
		'searchQuery': searchQuery,
	};
}

function shouldUpdateSearchQuery(state: State, searchQuery: SearchQuery): boolean {
	return searchQuery !== getSearchQuery(state);
}

export function updateSearchQueryIfNeeded(searchQuery: SearchQuery) {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if (shouldUpdateSearchQuery(state, searchQuery)) {
			dispatch(updateSearchQuery(searchQuery));
			dispatch(fetchSearchResultIfNeeded());
		}
	};
}

export function invalidateSearchResult(): InvalidateSearchResultAction {
	return {
		'type': SearchKeys.INVALIDATE_SEARCH_RESULT,
	};
}

function fetchSearchResultRequest(): FetchSearchResultRequestAction {
	return {
		'type': SearchKeys.FETCH_SEARCH_RESULT_REQUEST,
	};
}

function fetchSearchResultReceive(tweets: Tweet[]): FetchSearchResultReceiveAction {
	return {
		'type': SearchKeys.FETCH_SEARCH_RESULT_RECEIVE,
		'tweets': tweets,
	};
}

function fetchSearchResult(searchQuery: SearchQuery) {
	return async (dispatch: Dispatch<any>) => {
		dispatch(fetchSearchResultRequest());

		try {
			const res = await sendRequest(RequestType.SEARCH, {
				...searchQuery,
			});

			dispatch(fetchSearchResultReceive(res));
		}
		catch (err) {
			console.log(err);
		}
	};
}

function shouldFetchSearchResult(state: State): boolean {
	return true;
}

export function fetchSearchResultIfNeeded() {
	return (dispatch: Dispatch<any>, getState: () => State) => {
		const state = getState();

		if (shouldFetchSearchResult(state)) {
			const searchQuery = getSearchQuery(state);

			dispatch(fetchSearchResult(searchQuery));
		}
	};
}
