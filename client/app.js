import 'babel-polyfill';
// ready
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { values } from 'lodash';

import hydrateStore from './tools/hydrateStore';

import * as reducers from './../shared/redux/reducers';
import * as watchers from './../shared/redux/sagaWatchers';
import * as clentMiddleware from './redux/middleware';

import routes from './../shared/routes';

const historyMiddleware = routerMiddleware(browserHistory);
const sagaMiddleware = createSagaMiddleware();

const hydrated = hydrateStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer,
});

const middleware = applyMiddleware(
    ...values(clentMiddleware),
    historyMiddleware,
    sagaMiddleware
);

const store = createStore(reducer, hydrated, middleware);

values(watchers).forEach(sagaMiddleware.run);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);
