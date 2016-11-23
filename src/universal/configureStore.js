import { createStore } from 'redux';

import { reducer } from './reduxRoot';


export default function configureStore(state, middleware) {
  const store = createStore(
    reducer,
    state,
    middleware,
  );

  return store;
}
