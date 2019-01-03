import { observable, action } from 'mobx';
import fetch from 'isomorphic-fetch';
import 'es6-promise/auto';

export class SearchStore {
  @observable
  searchTerm = '';

  @observable
  searchResults = [];

  @observable
  isSearching = false;

  @action
  updateSearchTerm = (updatedTerm) => {
    this.searchTerm = updatedTerm;
  }

  @action
  performSearch = (game) => {
    this.isSearching = true;
    this.searchResults = [];

    fetch(`/api/search?game=${game}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.searchResults = json.data;
        this.isSearching = false;
      })
      .catch(err => {
        console.log(`An error occured: ${err}`);
        this.isSearching = false;
      });
  }
}
