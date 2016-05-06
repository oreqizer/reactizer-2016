import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { values } from 'ramda';

import * as reducers from './reducers';
// import * as middleware from './middleware';

/**
 * @prop hydratedState {Object}
 * @prop ownMiddleware {Array}
 * @prop enhancers {Array}
 */
export default function (options = {}) {
  const {
    hydratedState = {},
    ownMiddleware = [],
    enhancers = [],
  } = options;

  const combinedReducers = combineReducers(reducers);

  const appliedMiddleware = applyMiddleware(
    // ...values(middleware),
    ...ownMiddleware,
  );

  const store = createStore(
    combinedReducers,
    hydratedState,
    compose(
      appliedMiddleware,
      ...enhancers
    )
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
