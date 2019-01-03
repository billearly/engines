import styled from 'styled-components';
import { SearchForm, SearchResultList } from '../components';
import { Provider } from 'mobx-react';
import { SearchStore } from '../stores';

const store = new SearchStore();

const Main = styled.main`
  background-color: #accdd1;
  height: 100vh;
`;

const Index = () => {
  return (
    <Provider SearchStore={store}>
      <Main>
          <SearchForm />
          <SearchResultList />
      </Main>
    </Provider>
  )
}

export default Index;
