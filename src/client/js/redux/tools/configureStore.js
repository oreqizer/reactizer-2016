import { createStore } from 'redux';
import { values } from 'lodash';

import hydrateStore from './hydrateStore';

import reducer from './../reducer';
import middleware, { sagaMiddleware } from './../middleware';

import * as watchers from './../../../../universal/redux/sagaWatchers';

const hydrated = hydrateStore(document.body.getAttribute('data-redux-state'));

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
