import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { values } from 'ramda';

import configureStore from '../../universal/configureStore';
import * as watchers from '../../universal/watchers';

import cookieMiddleware from './middleware/cookieMiddleware';

const sagaMiddleware = createSagaMiddleware();
const historyMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
  collapsed: true,
});

const initialState = JSON.parse(decodeURI(document.body.getAttribute('data-redux-state')));

const ownMiddleware = [
  sagaMiddleware,
  historyMiddleware,
  loggerMiddleware,
  cookieMiddleware,
];

const enhancers = [];
if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
  // chrome Redux extension: https://github.com/zalmoxisus/redux-devtools-extension
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}

const store = configureStore({
  initialState,
  ownMiddleware,
  enhancers,
});

// run saga watchers
values(watchers).forEach(sagaMiddleware.run);

export default store;
