import React, { Component } from 'react';
import { Form, Input, Button } from './form';
import { inject, observer } from 'mobx-react';

@inject('SearchStore')
@observer
export class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isSearchTermValid = this.isSearchTermValid.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    this.props.SearchStore.updateSearchTerm(e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();

    // Abort if we are already performing a search
    if (this.props.SearchStore.isSearching) {
      return;
    }

    if (this.isSearchTermValid()) {
      console.log(`Searching for: ${this.props.SearchStore.searchTerm}`);
      this.props.SearchStore.performSearch(this.props.SearchStore.searchTerm);
    } else {
      console.log('You need to provide a valid search term');
    }
  }

  isSearchTermValid() {
    return this.props.SearchStore.searchTerm && this.props.SearchStore.searchTerm.trim() !== '';
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Input
          disabled={this.props.SearchStore.isSearching}
          placeholder='Search for a game'
          onChange={this.handleChange}
          value={this.props.SearchStore.searchTerm}
        />

        <Button
          type='submit'
          disabled={this.props.SearchStore.isSearching}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
