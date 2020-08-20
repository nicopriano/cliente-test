import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import { handleItemDetail, handleSearch } from './itemsManager';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('server-build'));
app.use(express.static('./build'));

app.use('/items', handleSearch);
app.use('/items/:id', handleItemDetail);

app.get('/*', async (req, res) => {

  try {

    const context = { data: req.meliContext };
    const helmet = Helmet.renderStatic();
    const indexFile = path.resolve('./build/index.html');

    const app = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    );

    
    fs.readFile(indexFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Something went wrong:', err);
        return res.status(500).send('Oops, better luck next time!');
      }

      return res.send(
        data
          .replace('<title>React App</title>', helmet.title.toString())
          // .replace(`<meta`, `${helmet.meta.toString()}<meta`)
          .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
          .replace(
            '</body>',
            `<script>window.__ROUTE_DATA__ = ${serialize(context.data)}</script></body>`
          )
      );
    });

  } catch (error) {
    console.error('Something went wrong:', error);
    return res.status(500).send('Oops, better luck next time!', error);
  }
  
});



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});