import { createMemoryHistory, match } from 'react-router';
import createSagaMiddleware from 'redux-saga';

import configureStore from './../../universal/redux/configureStore';
import logMiddleware from './../redux/logMiddleware';
import fetchMessages from './../tools/fetchMessages';
import fetchData from './../tools/fetchData';
import render from './../markup';

import routes from './../../browser/js/router';
import logger from '../../../etc/lib/logger';
import { locales, defaultLocale, appName } from './../../../etc/config';

function getInitialState(req) {
  const locale = req.acceptsLanguages(locales) || defaultLocale;

  return {
    intl: {
      defaultLocale,
      locale,
      locales,
      initialNow: Date.now(),
      messages: fetchMessages(locale),
    },
    config: {
      appName,
    },
  };
}

export default function (req, res, next) {
  const history = createMemoryHistory(req.url);

  const sagaMiddleware = createSagaMiddleware();
  const ownMiddleware = [
    logMiddleware,
    sagaMiddleware,
  ];

  const initialState = getInitialState(req);

  const store = configureStore({
    initialState,
    ownMiddleware,
  });

  logger.info(`Request URL: ${req.url}`);

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
        logger.warn('No matching route');
        res.status(404);
        return;
      }

      logger.info('Route matched, fetching data...');
      await fetchData(store, sagaMiddleware, renderProps);

      logger.info('Rendering HTML...');
      const html = render(store, renderProps, req.url);

      res.end(html);
      logger.success('Response ended successfully');
    } catch (err2) {
      logger.error('Response error', err2);
      next(err2);
    }
  });
}

