require('dotenv').config();
require('isomorphic-fetch');
require('es6-promise').polyfill();

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';

const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');

app.prepare().then(() => {
  const server = express();

  server.get('/api/search', (req, res) => {
    // Make sure we have a game
    if (!req.query.game) {
      res.status(400);
      res.send('No game specified');
    }

    // Make a request to IGDB
    fetch(`${process.env.IGDB_URL}/search`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'user-key': process.env.IGDB_USER_KEY
      },
      body: `search "${req.query.game}"; fields name,game;`
    })
    .then(res => {
      return res.json();
    })
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
