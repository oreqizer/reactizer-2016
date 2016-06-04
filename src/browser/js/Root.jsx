import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';

import store from './clientStore';
import getRoutes from './../../web/Router';

const routes = getRoutes(store);
const history = syncHistoryWithStore(browserHistory, store);
const muiTheme = getMuiTheme();

const Root = () =>
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router children={routes} history={history} />
    </MuiThemeProvider>
  </Provider>;

export default Root;
