import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import * as reducers from './../shared/redux/reducers';

import routes from '../shared/routes';
import logger from '../etc/tools/logger';

export default function (app) {
  app.use((req, res) => {
    // TODO add react-router-redux + async data fetching

    const history = createMemoryHistory(req.url);
    const reducer = combineReducers(reducers);
    const store = createStore(reducer);

    logger.info(`Request URL: ${req.url}`);

    match({ history, routes, location: req.url }, (err, redirect, renderProps) => {
      if (err) {
        logger.error(err);
        res.status(500).end('Internal server error');
        return;
      }

      if (!renderProps) {
        logger.warn('No matching route.');
        res.status(404).end('Not found.');
        return;
      }

      logger.info('Route matched.');
      const InitialComponent = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
      );

      const initialState = store.getState();

      const componentHTML = renderToString(InitialComponent);

      // TODO dynamic template in real app
      const HTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Isomorphic Redux Demo</title>
      
                <script type="application/javascript">
                  window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                </script>
            </head>
            <body>
                <div id="react-view">${componentHTML}</div>
                <script type="application/javascript" src="/bundle.js"></script>
            </body>
        </html>`;

      res.end(HTML);
    });
  });

  return app;
}

