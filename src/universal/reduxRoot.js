import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form-lite';

import config from './modules/config/configDuck';
import intl from './modules/intl/intlDuck';
import todo, { todoEpic } from './modules/todo/todoDuck';
import ui from './modules/ui/uiDuck';
import user, { userEpic } from './modules/user/userDuck';

export const reducer = combineReducers({
  config,
  intl,
  todo,
  ui,
  user,
  reduxFormLite: formReducer,
  routing: routerReducer,
});

export const epic = combineEpics(
  todoEpic,
  userEpic,
);
