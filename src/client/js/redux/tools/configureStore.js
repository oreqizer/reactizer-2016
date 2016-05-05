import { createStore, compose } from 'redux';
import { values } from 'lodash';

import hydrateStore from './hydrateStore';

import reducer from './../reducer';
import middleware, { sagaMiddleware } from './../middleware';

import * as watchers from './../../../../universal/redux/sagaWatchers';

const hydrated = hydrateStore(document.body.getAttribute('data-redux-state'));

const store = createStore(reducer, hydrated, compose(
  middleware,
  // chrome Redux extension: https://github.com/zalmoxisus/redux-devtools-extension
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

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
