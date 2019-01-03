require('isomorphic-fetch');
require('es6-promise').polyfill();

// Takes a list of games and produces a list if ids that the IGDB API can consume
// Some game objects do not have a game id. Need to filter them out
const getFormattedGameIds = (games) => {
  const gameIds = games.reduce((result, game) => {
    if (game.game) {
      result.push(game.game);
    }
    return result;
  }, []);

  if (gameIds.length === 0) {
    throw Error('No game ids found for games');
  }

  return `(${gameIds.join(',')})`;
}

module.exports = {
  // Perform a search for a game
  getGames (game) {
    return fetch(`${process.env.IGDB_URL}/search`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'user-key': process.env.IGDB_USER_KEY
      },
      body: `search "${game}"; fields name,game;`
    })
    .then(res => {
      return res.json();
    });
  },

  // Get engine info for all the games in the list
  getEngineInfo (games) {
    return fetch(`${process.env.IGDB_URL}/games`, {
      method: 'POST',
      headers: {
        'user-key': process.env.IGDB_USER_KEY
      },
      body: `where id = ${getFormattedGameIds(games)}; fields game_engines.name,name;`
    })
    .then(res => {
      return res.json();
    });
  }
}
