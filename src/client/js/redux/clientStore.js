import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { values } from 'lodash';

import hydrateStore from './hydrateStore';
import configureStore from './../../../universal/redux/configureStore';

import * as watchers from './../../../universal/redux/sagaWatchers';

const sagaMiddleware = createSagaMiddleware();
const historyMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
  collapsed: true,
});

const hydratedState = hydrateStore(document.body.getAttribute('data-redux-state'));

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
  hydratedState,
  ownMiddleware,
  enhancers,
});

values(watchers).forEach(sagaMiddleware.run);

export default store;
