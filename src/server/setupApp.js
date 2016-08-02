import { createMemoryHistory, match } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import getRoutes from '../browser/js/getRoutes';
import configureStore from '../universal/configureStore';

import logMiddleware from './middleware/logMiddleware';
import getInitialState from './tools/getInitialState';
import fetchNeeds from './tools/fetchNeeds';
import markup from './markup';

import logger from './lib/logger';

export default function setupApp({ assets, locales }) {
  return async function reactApp(req, res, next) {
    const history = createMemoryHistory(req.url);

    const sagaMiddleware = createSagaMiddleware();
    const ownMiddleware = [
      logMiddleware,
      sagaMiddleware,
    ];

    const initialState = await getInitialState(req, locales);

    const store = configureStore({
      initialState,
      ownMiddleware,
    });

    const routes = getRoutes(store);
    logger.info('[reactApp] Request recieved', req.url);

    match({ history, routes, location: req.url }, async (matchErr, redirect, renderProps) => {
      try {
        if (matchErr) {
          logger.error(matchErr);
          next(matchErr);
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

        await fetchNeeds(store, sagaMiddleware, renderProps);

        const doctype = '<!DOCTYPE html>';
        const html = markup({ store, assets, renderProps, req });

        res.end(doctype + html);
      } catch (err) {
        logger.error('[reactApp] Response error', err);
        next(err);
      }
    });
  };
}

