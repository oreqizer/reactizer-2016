import { createMemoryHistory, match } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';

import getRoutes from '../browser/getRoutes';
import { epic, reducer } from '../universal/reduxRoot';

import logMiddleware from './middleware/logMiddleware';
import getInitialState from './tools/getInitialState';
import fetchNeeds from './tools/fetchNeeds';
import markup from './markup';

import logger from './lib/logger';


export default function setupApp({ assets, locales }) {
  return (req, res, next) => {
    const history = createMemoryHistory(req.url);

    const middleware = applyMiddleware(
      createEpicMiddleware(epic),
      logMiddleware,
    );

    const initialState = getInitialState(req, locales);

    const store = createStore(reducer, initialState, middleware);

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

        await fetchNeeds(store, renderProps);

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
