import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';

import Html from './Html.jsx';

import fetchAssetInfo from './../tools/fetchAssetInfo';

const renderApp = (store, props) =>
  <Provider store={store}>
    <RouterContext {...props} />
  </Provider>;

export default function (store, renderProps) {
  const assets = fetchAssetInfo();

  const reduxState = JSON.stringify(store.getState());
  const app = renderApp(store, renderProps);
  const head = Helmet.rewind();

  const html = renderToStaticMarkup(
    <Html
      head={head}
      assets={assets}
      state={reduxState}
    >
      {app}
    </Html>
  );

  return `<!DOCTYPE html>${html}`;
}
