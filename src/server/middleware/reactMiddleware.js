import { createMemoryHistory, match } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import configureStore from './../../universal/redux/configureStore';
import serverMiddleware from './../redux/serverMiddleware';
import fetchData from './../tools/fetchData';
import render from './../markup';

import routes from './../../universal/router';
import logger from './../../../etc/tools/logger';

export default function (app) {
  /* eslint-disable no-param-reassign */
  app.use(async (ctx, next) => {
    const history = createMemoryHistory(ctx.url);

    const sagaMiddleware = createSagaMiddleware();
    const ownMiddleware = [
      serverMiddleware,
      sagaMiddleware,
    ];

    const store = configureStore({ ownMiddleware });

    logger.info(`Request URL: ${ctx.url}`);

    match({ history, routes, location: ctx.url }, async (err, redirect, renderProps) => {
      try {
        if (err) {
          logger.error(err);
          ctx.status = 500;
          ctx.message = 'Error while handling request.';
          return;
        }

        if (!renderProps) {
          logger.warn('No matching route.');
          ctx.status = 404;
          ctx.message = 'Not found.';
          return;
        }

        logger.info('Route matched, fetching data...');
        await fetchData(store, sagaMiddleware, renderProps.components, renderProps);

        logger.info('Rendering HTML...');
        const html = render(store, renderProps, ctx.url);

        ctx.body = html;
        logger.success('Response ended successfully.');
      } catch (err2) {
        logger.error(err2);
        ctx.status = 500;
        ctx.message = 'Internal server error.';
      } finally {
        await next();
      }
    });
  });

  return app;
}

