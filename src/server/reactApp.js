import { createMemoryHistory, match } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import getRoutes from '../browser/js/getRoutes';
import configureStore from '../universal/configureStore';
import logMiddleware from './middleware/logMiddleware';
import getInitialState from './tools/getInitialState';
import fetchData from './tools/fetchData';
import markup from './markup';

import logger from './lib/logger';

export default async function reactApp(req, res, next) {
  const history = createMemoryHistory(req.url);

  const sagaMiddleware = createSagaMiddleware();
  const ownMiddleware = [
    logMiddleware,
    sagaMiddleware,
  ];

  const initialState = await getInitialState(req);

  const store = configureStore({
    initialState,
    ownMiddleware,
  });

  const routes = getRoutes(store);
  logger.info(`[reactApp] Request URL: ${req.url}`);

  match({ history, routes, location: req.url }, async (err, redirect, renderProps) => {
    try {
      if (err) {
        logger.error(err);
        next(err);
        return;
      }

      if (redirect) {
        res.redirect(301, redirect.pathname + redirect.search);
        return;
      }

      if (!renderProps) {
        logger.warn('[reactApp] No matching route');
        res.status(404);
        return;
      }

      logger.info('[reactApp] Route matched, fetching data...');
      await fetchData(store, sagaMiddleware, renderProps);

      logger.info('[reactApp] Rendering HTML...');
      const doctype = '<!DOCTYPE html>';
      const html = markup(store, renderProps, req);

      res.end(doctype + html);
      logger.success('[reactApp] Response ended successfully');
    } catch (err2) {
      logger.error('[reactApp] Response error', err2);
      next(err2);
    }
  });
}

