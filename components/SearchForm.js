import React, { Component } from 'react';
import { Form, Input, Button } from './form';

export class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      isSearching: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isSearchTermValid = this.isSearchTermValid.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    this.setState({
      searchTerm: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    // Abort if we are already performing a search
    if (this.state.isSearching) {
      return;
    }

    if (this.isSearchTermValid()) {
      console.log(`Searching for: ${this.state.searchTerm}`);
      this.setState({
        isSearching: true
      });
    } else {
      console.log('You need to provide a valid search term');
    }
  }

  isSearchTermValid() {
    return this.state.searchTerm && this.state.searchTerm.trim() !== '';
  }

  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <Input
          disabled={this.state.isSearching}
          placeholder='Search for a game'
          onChange={this.handleChange}
          value={this.state.searchTerm}
        />

        <Button
          type='submit'
          disabled={this.state.isSearching}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
