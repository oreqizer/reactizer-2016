import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todos from './ducks/todoDuck';

export default combineReducers({
  todos,
  routing: routerReducer,
});
