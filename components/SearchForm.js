import styled from 'styled-components';
import React, { Component } from 'react';
import { Form, Input, Button } from './form';
import { inject, observer } from 'mobx-react';

const StyledSearchForm = styled.div`
  background-color: #323232;
  padding-bottom: 1rem;
  padding-top: 12rem;

  ${Button} {
    margin-top: 1rem;
  }
`;

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

    if (this.props.SearchStore.searchState === 'searching') {
      return;
    }

    if (this.isSearchTermValid()) {
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
      <StyledSearchForm>
        <Form
          onSubmit={this.handleSubmit}
        >
          <Input
            disabled={this.props.SearchStore.searchState === 'searching'}
            placeholder='Search for a game'
            onChange={this.handleChange}
            value={this.props.SearchStore.searchTerm}
          />

          <Button
            type='submit'
            disabled={this.props.SearchStore.searchState === 'searching'}
          >
            Search
          </Button>
        </Form>
      </StyledSearchForm>
    );
  }
}
