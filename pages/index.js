import { SearchForm } from '../components';
import { Provider } from 'mobx-react';
import { SearchStore } from '../stores';

const store = new SearchStore();

const Index = () => {
  return (
    <Provider SearchStore={store}>
      <SearchForm />
    </Provider>
  )
}

export default Index;
