import React from 'react';
import { renderToString } from '../../node_modules/react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import Html from './Html.jsx';

import fetchAssetInfo from './../tools/fetchAssetInfo';
import fetchMetadata from './../tools/fetchMetadata';

export default function (store, renderProps, route) {
  const reduxState = JSON.stringify(store.getState());
  const assets = fetchAssetInfo();

  const data = {
    ...fetchMetadata(route),
    js: assets.main.js,
    css: assets.main.css,
  };

  return (
    <Html
      state={reduxState}
    >
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    </Html>
  );
}
