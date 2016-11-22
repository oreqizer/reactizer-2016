import { createStore } from 'redux';

import { reducer } from './root';


export default function configureStore(state, middleware) {
  const store = createStore(
    reducer,
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
