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

    fetch(`/api/search?game=${game}`)
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        this.isSearching = false;
      })
      .catch(err => {
        console.log(`An error occured: ${err}`);
      });
  }
}