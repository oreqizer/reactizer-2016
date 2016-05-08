import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import config from './ducks/configDuck';
import intl from './ducks/intlDuck';
import todos from './ducks/todoDuck';

export default combineReducers({
  config,
  intl,
  todos,
  routing: routerReducer,
});
