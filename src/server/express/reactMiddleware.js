import { createMemoryHistory, match } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import configureStore from '../../universal/configureStore';
import getRoutes from '../../browser/js/Router';
import logMiddleware from '../middleware/logMiddleware';
import getInitialState from '../tools/getInitialState';
import fetchData from '../tools/fetchData';
import render from '../markup';

import logger from '../lib/logger';

export default async function reactMiddleware(req, res, next) {
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
  logger.info(`[reactMiddleware] Request URL: ${req.url}`);

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
        logger.warn('[reactMiddleware] No matching route');
        res.status(404);
        return;
      }

      logger.info('[reactMiddleware] Route matched, fetching data...');
      await fetchData(store, sagaMiddleware, renderProps);

      logger.info('[reactMiddleware] Rendering HTML...');
      const doctype = '<!DOCTYPE html>';
      const html = render(store, renderProps, req);

      res.end(doctype + html);
      logger.success('[reactMiddleware] Response ended successfully');
    } catch (err2) {
      logger.error('[reactMiddleware] Response error', err2);
      next(err2);
    }
  });
}

