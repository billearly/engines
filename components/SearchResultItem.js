import styled from 'styled-components';

export const StyledSearchResultItem = styled.li`
  background-color: lightgray;
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
