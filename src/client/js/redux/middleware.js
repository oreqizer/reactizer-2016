import { browserHistory } from 'react-router';
import { applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';

const historyMiddleware = routerMiddleware(browserHistory);
const loggerMiddleware = createLogger({
  collapsed: true,
});

export const sagaMiddleware = createSagaMiddleware();

export default applyMiddleware(
  historyMiddleware,
  loggerMiddleware,
  sagaMiddleware
);
