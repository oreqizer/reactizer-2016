import { browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { values } from 'lodash';

import hydrateStore from './hydrateStore';

import reducer from './../reducer';
import * as clientMiddleware from './../clientMiddleware';

import * as watchers from './../../../../shared/redux/sagaWatchers';

const historyMiddleware = routerMiddleware(browserHistory);
const sagaMiddleware = createSagaMiddleware();

const hydrated = hydrateStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle

const middleware = applyMiddleware(
    ...values(clientMiddleware),
    historyMiddleware,
    sagaMiddleware
);

const store = createStore(reducer, hydrated, middleware);

values(watchers).forEach(sagaMiddleware.run);

export default store;

// -------------------
// Hot-reloading Redux
// -------------------

/* eslint-disable */
if (module.hot) {
  module.hot.accept('./../reducer', () => {
    store.replaceReducer(reducer);
  });
}
