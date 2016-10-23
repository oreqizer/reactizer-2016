/* eslint-disable dot-notation */
import axios from 'axios';

import * as user from '../../universal/modules/user/userDuck';

const globalsMiddleware = () => next => (action) => {
  switch (action.type) {
    case user.LOGIN_SUCCESS:
    case user.REGISTER_SUCCESS:
      axios.defaults.headers.common['Authorization'] = action.payload.token;
      break;

    case user.LOGIN:
    case user.REGISTER:
    case user.LOGOUT:
      axios.defaults.headers.common['Authorization'] = null;
      break;

    default:
      break;
  }

  return next(action);
};

export default globalsMiddleware;
