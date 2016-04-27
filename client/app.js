import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { values } from 'lodash';

import * as middleware from './../shared/redux/middleware';
import * as reducers from './../shared/redux/reducers';
import * as sagas from './../shared/redux/sagas';

import routes from './../shared/routes';

import hydrateStore from './tools/hydrateStore';
import runSagas from './tools/runSagas';

const reducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();
const hydrated = hydrateStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

const store = createStore(
    reducer,
    applyMiddleware(...values(middleware), sagaMiddleware),
    hydrated
);

runSagas(sagas, sagaMiddleware);

render(
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>,
  document.getElementById('react-view')
);
