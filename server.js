require('dotenv').config();

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';

const next = require('next');
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express');

app.prepare().then(() => {
  const server = express();

  server.get('/api/search', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      data: 'your-results'
    }));
  });

  server.get('*', (req, res) =>
    handle(req, res)
  );

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});