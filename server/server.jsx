import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import fetchData from './tools/fetchData';
import runSagas from '../client/tools/runSagas';

import * as reducers from './../shared/redux/reducers';
import * as sagas from '../shared/redux/sagas';

import routes from '../shared/routes';
import logger from '../etc/tools/logger';

export default function (app) {
  app.use((req, res) => {
    // TODO add react-router-redux + async data fetching

    const sagaMiddleware = createSagaMiddleware();

    const history = createMemoryHistory(req.url);
    const reducer = combineReducers(reducers);
    const store = createStore(
        reducer,
        reducers,
        applyMiddleware(sagaMiddleware)
    );

    logger.info('Running Redux Sagas...');
    runSagas(sagas, sagaMiddleware);
    
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

      logger.info('Route matched, fetching data...');

      function renderView() {
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

        return HTML;
      }

      fetchData(store, renderProps.components, sagaMiddleware, renderProps)
          .then(renderView)
          .then(html => res.end(html))
          .catch(err2 => res.status(500).end(err2.message));
    });
  });

  return app;
}

