import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as reducers from './../../../shared/redux/reducers';

export default combineReducers({
  ...reducers,
  routing: routerReducer,
});
