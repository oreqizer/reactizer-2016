import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { values } from 'ramda';

import configureStore from './../../../universal/redux/configureStore';

import * as watchers from './../../../universal/redux/watchers';

const sagaMiddleware = createSagaMiddleware();
const historyMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
  collapsed: true,
});

const initialState = JSON.parse(document.body.getAttribute('data-redux-state'));

const ownMiddleware = [
  sagaMiddleware,
  historyMiddleware,
  loggerMiddleware,
];

const enhancers = [
  // chrome Redux extension: https://github.com/zalmoxisus/redux-devtools-extension
  window.devToolsExtension ? window.devToolsExtension() : f => f,
];

const store = configureStore({
  initialState,
  ownMiddleware,
  enhancers,
});

values(watchers).forEach(sagaMiddleware.run);

export default store;
