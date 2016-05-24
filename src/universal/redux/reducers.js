import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import config from './modules/config/configDuck';
import intl from './modules/intl/intlDuck';
import todo from './modules/todo/todoDuck';
import ui from './modules/ui/uiDuck';
import user from './modules/user/userDuck';

export default combineReducers({
  config,
  intl,
  todo,
  ui,
  user,
  form: formReducer,
  routing: routerReducer,
});
