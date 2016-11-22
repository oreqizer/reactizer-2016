import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { values } from 'ramda';

import configureStore from '../universal/configureStore';
import * as watchers from '../universal/watchers';

import globalsMiddleware from './middleware/globalsMiddleware';


const __DEV__ = process.env.NODE_ENV !== 'production'; // eslint-disable-line no-undef, no-underscore-dangle

const sagaMiddleware = createSagaMiddleware();
const historyMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
  collapsed: true,
});

const initialState = JSON.parse(document.body.getAttribute('data-redux-state'));

const middlewares = [
  sagaMiddleware,
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

const store = configureStore(initialState, middleware);

// run saga watchers
values(watchers).forEach(sagaMiddleware.run);

export default store;
