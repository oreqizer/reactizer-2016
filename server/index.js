import { createMemoryHistory, match } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { values } from 'lodash';

import fetchData from './tools/fetchData';
import renderView from './tools/renderView';

import * as reducers from '../universal/redux/reducers';
import * as serverMiddleware from './redux/serverMiddleware';

import routes from '../universal/router';
import logger from '../etc/tools/logger';

export default function (app) {
  app.use((req, res) => {
    const sagaMiddleware = createSagaMiddleware();

    const history = createMemoryHistory(req.url);
    const reducer = combineReducers(reducers);

    const middleware = applyMiddleware(
      ...values(serverMiddleware),
      sagaMiddleware
    );

    const store = createStore(reducer, {}, middleware);

    logger.info(`Request URL: ${req.url}`);

    match({ history, routes, location: req.url }, async (err, redirect, renderProps) => {
      try {
        if (err) {
          logger.error(err);
          res.status(500).end('Error while handling request.');
          return;
        }

        if (!renderProps) {
          logger.warn('No matching route.');
          res.status(404).end('Not found.');
          return;
        }

        logger.info('Route matched, fetching data...');
        await fetchData(store, sagaMiddleware, renderProps.components, renderProps);

        logger.info('Rendering HTML...');
        const html = renderView(store, renderProps);

        res.end(html);
      } catch (err2) {
        logger.error(err2);
        res.status(500).end('Internal server error.');
      }
    });
  });

  return app;
}

