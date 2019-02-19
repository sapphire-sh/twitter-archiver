import React from 'react';

import {
	bindActionCreators,
	Dispatch,
} from 'redux';

import {
	connect,
} from 'react-redux';

import {
	invalidateSearchQuery,
	updateSearchQueryIfNeeded,
	fetchSearchResultIfNeeded,
} from '~/client/actions';

import {
	SearchQuery,
	Tweet,
} from '~/shared/models';

import {
	State,
} from '~/client/reducers';

import {
	getSearchQuery,
	getSearchResult,
} from '~/client/selectors';

import {
	SearchFormComponent,
	SearchResultComponent,
} from '~/client/components';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	searchQuery: SearchQuery;
	searchResult: Tweet[];

	invalidateSearchQuery: typeof invalidateSearchQuery;
	updateSearchQueryIfNeeded: typeof updateSearchQueryIfNeeded;
	fetchSearchResultIfNeeded: typeof fetchSearchResultIfNeeded;
}

class SearchComponent extends React.Component<ComponentProps> {
	public render() {
		return (
			<div id="search">
				<Segment.Group size="tiny">
					<Segment>
						<SearchFormComponent
							{...this.props}
						/>
						<SearchResultComponent
							{...this.props}
						/>
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'searchQuery': getSearchQuery(state),
		'searchResult': getSearchResult(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch) {
	return bindActionCreators({
		'invalidateSearchQuery': invalidateSearchQuery,
		'updateSearchQueryIfNeeded': updateSearchQueryIfNeeded,
		'fetchSearchResultIfNeeded': fetchSearchResultIfNeeded,
	}, dispatch);
}

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
