import styled from 'styled-components';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { SearchResultItem, Spinner } from './';

const SearchResults = styled.div`
  padding: 2rem 0;
  max-width: 50rem;
  margin: 0 auto;
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
`;

@inject('SearchStore')
@observer
export class SearchResultList extends Component {
  constructor(props) {
    super(props);

    this.createResultItems = this.createResultItems.bind(this);
  }

  createResultItems() {
    if (this.props.SearchStore.searchResults.length === 0) {
      return <p>No results</p>;
    }

    return this.props.SearchStore.searchResults.map(result =>
      <SearchResultItem {...result} />
    );
  }

  getSearchResults() {
    switch(this.props.SearchStore.searchState) {
      case 'none':
        return <p>Search for some games to see results</p>

      case 'searching':
        return <Spinner />

      case 'complete':
        return this.createResultItems();

      default:
        console.log(`Error: ${this.props.SearchStore.searchState} is not a valid state`);
        return <p>Whoops something went wrong</p>
    }
  }

  render() {
    return (
      <SearchResults>
        <ResultGrid>
          {this.getSearchResults()}
        </ResultGrid>
      </SearchResults>
    )
  }
}
