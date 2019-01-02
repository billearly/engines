import { SearchForm, SearchResultList } from '../components';
import { Provider } from 'mobx-react';
import { SearchStore } from '../stores';

const store = new SearchStore();

const Index = () => {
  return (
    <Provider SearchStore={store}>
      <>
        <SearchForm />
        <SearchResultList />
      </>
    </Provider>
  )
}

export default Index;
