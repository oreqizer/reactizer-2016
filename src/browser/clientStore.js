import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createLogger from 'redux-logger';

import { reducer, epic } from '../universal/reduxRoot';

import globalsMiddleware from './middleware/globalsMiddleware';


const __DEV__ = process.env.NODE_ENV !== 'production'; // eslint-disable-line no-undef, no-underscore-dangle

const epicMiddleware = createEpicMiddleware(epic);
const historyMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
  collapsed: true,
});

const initialState = JSON.parse(document.body.getAttribute('data-redux-state'));

const middlewares = [
  epicMiddleware,
  historyMiddleware,
  globalsMiddleware,
];

// chrome Redux extension: https://github.com/zalmoxisus/redux-devtools-extension
const chromeDevtool = __DEV__ && window.devToolsExtension ? window.devToolsExtension() : f => f;

if (__DEV__) {
  // console logging for debugging
  middlewares.push(loggerMiddleware);
}

const middleware = compose(applyMiddleware(...middlewares), chromeDevtool);

const store = createStore(reducer, initialState, middleware);

export default store;

// -------------------
// Hot-reloading Redux
// -------------------

/* eslint-disable no-undef */
if (module.hot) {
  module.hot.accept('../universal/reduxRoot', () => {
    store.replaceReducer(reducer);
    epicMiddleware.replaceEpic(epic);
  });
}
/* eslint-enable no-undef */
