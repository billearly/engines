require('dotenv').config();

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';

const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const { getGames, getEngineInfo } = require('./data/igdb-source');

app.prepare().then(() => {
  const server = express();

  server.get('/api/search', (req, res) => {
    // Make sure we have a game
    if (!req.query.game) {
      res.status(400);
      res.send('No game specified');
    }

    // Make a request to IGDB
    getGames(req.query.game)
      .then(gameData => {
        if (gameData.length === 0) {
          return [];
        }

        return getEngineInfo(gameData);
      })
      .then(engineData => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          data: engineData
        }));
      })
      .catch(err => {
        console.log(err);
    
        res.status(500);
        res.send('An error occured');
      });
  });

  server.get('*', (req, res) =>
    handle(req, res)
  );

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
