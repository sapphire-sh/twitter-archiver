import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Segment } from 'semantic-ui-react';
import { fetchSearchResultIfNeeded, invalidateSearchQuery, updateSearchQueryIfNeeded } from '~/client/actions';
import { SearchFormComponent, SearchResultComponent } from '~/client/components';
import { State } from '~/client/reducers';
import { getSearchQuery, getSearchResult } from '~/client/selectors';
import { SearchQuery, Tweet } from '~/shared/models';

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
            <SearchFormComponent {...this.props} />
            <SearchResultComponent {...this.props} />
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

function mapStateToProps(state: State) {
  return {
    searchQuery: getSearchQuery(state),
    searchResult: getSearchResult(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      invalidateSearchQuery,
      updateSearchQueryIfNeeded,
      fetchSearchResultIfNeeded,
    },
    dispatch
  );
}

export const SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
