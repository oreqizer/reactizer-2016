import { createMemoryHistory, match } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { values } from 'lodash';

import fetchData from './tools/fetchData';
import renderView from './tools/renderView';

import * as reducers from './../shared/redux/reducers';
import * as serverMiddleware from './redux/middleware';

import routes from '../shared/router';
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

      fetchData(store, sagaMiddleware, renderProps.components, renderProps) // TODO async function
          .then(() => renderView(store, renderProps))
          .then(html => res.end(html))
          .catch(err2 => res.status(500).end(err2.message));
    });
  });

  return app;
}

