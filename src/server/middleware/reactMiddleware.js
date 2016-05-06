import { createMemoryHistory, match } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import configureStore from './../../universal/redux/configureStore';
import serverMiddleware from './../redux/serverMiddleware';
import fetchData from './../tools/fetchData';
import render from './../markup';

import routes from './../../browser/js/router';
import logger from './../../../etc/tools/logger';

export default function (app) {
  app.use((req, res) => {
    const history = createMemoryHistory(req.url);

    const sagaMiddleware = createSagaMiddleware();
    const ownMiddleware = [
      serverMiddleware,
      sagaMiddleware,
    ];

    const store = configureStore({ ownMiddleware });

    logger.info(`Request URL: ${req.url}`);

    match({ history, routes, location: req.url }, async (err, redirect, renderProps) => {
      try {
        if (err) {
          logger.error(err);
          res.status(500).end('Error while handling request.');
          return;
        }

        if (redirect) {
          res.redirect(301, redirect.pathname + redirect.search);
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
        const html = render(store, renderProps, req.url);

        res.end(html);
        logger.success('Response ended successfully.');
      } catch (err2) {
        logger.error(err2);
        res.status(500).end('Internal server error.');
      }
    });
  });

  return app;
}

