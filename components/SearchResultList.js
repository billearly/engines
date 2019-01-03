import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { SearchResultItem } from './';

@inject('SearchStore')
@observer
export class SearchResultList extends Component {
  constructor(props) {
    super(props);

    this.createResultItems = this.createResultItems.bind(this);
  }

  createResultItems() {
    return this.props.SearchStore.searchResults.map(result =>
      <SearchResultItem {...result} />
    );
  }

  render() {
    return (
      <div>
        <p>Results:</p>

        {this.props.SearchStore.searchResults.length > 0 
          ? this.createResultItems()
          : <p>No results</p>
        }
      </div>
    )
  }
}
