import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Helmet from 'react-helmet';

import Html from './Html';

import fetchAssetInfo from './../tools/fetchAssetInfo';

const renderApp = (store, props, muiTheme) =>
  renderToString(
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <RouterContext {...props} />
      </MuiThemeProvider>
    </Provider>
  );

const muiTheme = req =>
  getMuiTheme({
    userAgent: req.headers['user-agent'],
  });

export default function markup({ store, renderProps, req }) {
  const assets = fetchAssetInfo();

  const reduxState = JSON.stringify(store.getState());
  const app = renderApp(store, renderProps, muiTheme(req));
  const head = Helmet.rewind();

  const html = renderToStaticMarkup(
    <Html
      head={head}
      assets={assets}
      state={reduxState}
      app={app}
    />
  );

  return `<!DOCTYPE html>${html}`;
}
