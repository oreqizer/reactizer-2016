import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import Helmet from 'react-helmet';

import Html from './Html';

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

export default function markup({ store, assets, renderProps, req }) {
  const state = store.getState();

  const reduxState = JSON.stringify(state);
  const app = renderApp(store, renderProps, muiTheme(req));
  const head = Helmet.rewind();

  return renderToStaticMarkup(
    <Html
      head={head}
      assets={assets}
      locale={state.intl.locale}
      state={reduxState}
      app={app}
    />
  );
}
