import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import pug from 'pug';

import logger from '../../etc/tools/logger';

import { PRODUCTION } from '../../etc/config/env';
import fetchAssetInfo from './fetchAssetInfo';

export default function (store, renderProps) {
  const InitialComponent = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const initialState = store.getState();
  const assets = fetchAssetInfo();

  const data = {
    react: renderToString(InitialComponent),
    state: JSON.stringify(initialState),
    js: assets.main.js,
    css: assets.main.css,
  };

  const renderFn = pug.compileFile(path.join(__dirname, './../pug/index.pug'), {
    pretty: process.env.NODE_ENV !== PRODUCTION,
  });

  logger.info(data);

  return renderFn(data);
}
