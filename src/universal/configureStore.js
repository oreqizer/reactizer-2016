import { createStore } from 'redux';

import reducers from './reducers';

/**
 * @prop initialState {Object}
 * @prop ownMiddleware {Array}
 * @prop enhancers {Array}
 */
export default function configureStore(state, middleware) {
  const store = createStore(
    reducers,
    state,
    middleware,
  );

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
