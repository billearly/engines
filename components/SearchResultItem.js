import styled from 'styled-components';

const StyledSearchResultItem = styled.div`
  background-color: white;
  margin: 0.5rem;
  border-radius: 0.2rem;
  height: 15rem;
  box-shadow: 0 0.16em 0.75em #00000024;
  overflow: hidden;
`;

const TopHalf = styled.div`
  height: 50%;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), ${props => props.bgImg ? `url(${props.bgImg})` : 'none'};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
`;

const Info = styled.div`
  padding: 0.5rem;
`;

const BottomHalf = styled.div`
  padding: 0.5rem;
`;

export const SearchResultItem = ({
  id,
  name,
  game_engines,
  cover,
  first_release_date
}) => {
  const getEngineNames = (engines) => {
    if (!engines) {
      return 'no engines listed';
    }

    const names = engines.map(engine => engine.name);
    return names.join(', ');
  };

  const getCoverUrl = (coverInfo) => {
    if (coverInfo) {
      return coverInfo.url;
    }
  };

  const getReleaseYear = (releaseDate) => {
    if (!releaseDate) {
      return;
    }

    const year = new Date(releaseDate * 1000).getFullYear();
    return `(${year})`;
  };

  return (
    <StyledSearchResultItem>
      <TopHalf bgImg={getCoverUrl(cover)}>
        <Info>
          <span>{name} {getReleaseYear(first_release_date)}</span>
        </Info>
      </TopHalf>
      <BottomHalf>
        <p>Engine: {getEngineNames(game_engines)}</p>
      </BottomHalf>
    </StyledSearchResultItem>
  );
}
