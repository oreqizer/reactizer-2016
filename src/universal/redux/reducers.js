import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import config from './modules/config/configDuck';
import intl from './modules/intl/intlDuck';
import todos from './modules/todo/todoDuck';

export default combineReducers({
  config,
  intl,
  todos,
  routing: routerReducer,
});
