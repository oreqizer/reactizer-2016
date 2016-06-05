import axios from 'axios';
import { createStore, applyMiddleware, compose } from 'redux';

import reducers from './reducers';

import { URL } from './consts/apiConsts';

/**
 * @prop initialState {Object}
 * @prop ownMiddleware {Array}
 * @prop enhancers {Array}
 */
export default function (options = {}) {
  const {
    initialState = {},
    ownMiddleware = [],
    enhancers = [],
  } = options;

  const appliedMiddleware = applyMiddleware(
    ...ownMiddleware,
  );

  const store = createStore(
    reducers,
    initialState,
    compose(
      appliedMiddleware,
      ...enhancers
    )
  );

  // sets up 'axios' defaults
  axios.defaults.baseURL = URL;

  // -------------------
  // Hot-reloading Redux
  // -------------------

  /* eslint-disable no-undef */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers);
    });
  }
  /* eslint-enable no-undef */

  return store;
}
