import styled from 'styled-components';

export const StyledSearchResultItem = styled.div`
  background-color: white;
  margin: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.2rem;
  height: 15rem;
  box-shadow: 0 0.16em 0.75em #00000024;
`;

export const SearchResultItem = ({ id, name, game_engines }) => {
  const getEngineNames = (engines) => {
    if (!engines) {
      return 'no engines listed';
    }

    const names = engines.map(engine => engine.name);
    return names.join(', ');
  };

  return (
    <StyledSearchResultItem>
        <span>{name}</span> --- Engine(s): {getEngineNames(game_engines)}
    </StyledSearchResultItem>
  );
}
