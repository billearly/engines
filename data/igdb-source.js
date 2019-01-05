require('isomorphic-fetch');
require('es6-promise').polyfill();

// Returns a list of game ids
const searchForGames = (searchTerm) => {
  const fields = [
    'game'
  ];

  return fetch(`${process.env.IGDB_URL}/search`, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'user-key': process.env.IGDB_USER_KEY
    },
    body: `search "${searchTerm}"; fields ${fields.join(',')};`
  })
  .then(res => {
    return res.json();
  });
}

// Takes a list of game ids and returns info about the games (name, engine, cover url, etc)
const getGameInfo = (games) => {
  const fields = [
    'name',
    'game_engines.name',
    'cover.url',
    'first_release_date'
  ];

  return fetch(`${process.env.IGDB_URL}/games`, {
    method: 'POST',
    headers: {
      'user-key': process.env.IGDB_USER_KEY
    },
    body: `where id = ${getFormattedIds(games, 'game')} & category = 0; fields ${fields.join(',')};`
  })
  .then(res => {
    return res.json();
  });
}

// Takes a list of entities (games, covers) and produces a list of a particular property (game id, cover id) that the IGDB API can consume
const getFormattedIds = (entityList, property) => {
  const entityIds = entityList.reduce((result, entity) => {
    if (entity[property]) {
      result.push(entity[property]);
    }
    return result;
  }, []);

  if (entityIds.length === 0) {
    throw Error(`No ${property} ids found`);
  }

  return `(${entityIds.join(',')})`;
}

module.exports = {
  async getAggregatedGameData (searchTerm) {
    const searchResults = await searchForGames(searchTerm);

    if (searchResults.length === 0) {
      return [];
    }

    const gameInfo = await getGameInfo(searchResults);

    return gameInfo;
  }
}
