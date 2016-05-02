import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import pug from 'pug';

import { PRODUCTION } from '../../etc/config/env';
import fetchAssetInfo from './fetchAssetInfo';
import fetchMetadata from './fetchMetadata';

export default function (store, renderProps, route) {
  const InitialComponent = (
    <Provider store={store}>
      <RouterContext {...renderProps} />
    </Provider>
  );

  const initialState = encodeURI(JSON.stringify(store.getState()));
  const assets = fetchAssetInfo();

  const data = {
    ...fetchMetadata(route),
    react: renderToString(InitialComponent),
    state: initialState,
    js: assets.main.js,
    css: assets.main.css,
  };

  const renderFn = pug.compileFile(join(__dirname, './../pug/index.pug'), {
    pretty: process.env.NODE_ENV !== PRODUCTION,
  });

  return renderFn(data);
}
