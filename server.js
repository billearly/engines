require('dotenv').config();

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';

const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');
const { getAggregatedGameData } = require('./data/igdb-source');

app.prepare().then(() => {
  const server = express();

  server.get('/api/search', (req, res) => {
    if (!req.query.game) {
      res.status(400);
      res.send('No game specified');
    }

    getAggregatedGameData(req.query.game)
      .then(gameData => {
        res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
          data: gameData
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
