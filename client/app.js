import 'babel-polyfill';
// ready
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { values } from 'lodash';

import hydrateStore from './tools/hydrateStore';

import * as middleware from './../shared/redux/middleware';
import * as reducers from './../shared/redux/reducers';
import * as watchers from './../shared/redux/sagaWatchers';

import routes from './../shared/routes';

const reducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();
const hydrated = hydrateStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

const store = createStore(
    reducer,
    hydrated,
    applyMiddleware(...values(middleware), sagaMiddleware),
);

values(watchers).forEach(sagaMiddleware.run);

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('react-view')
);
