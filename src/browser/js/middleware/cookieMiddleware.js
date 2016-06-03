import cookie from 'js-cookie';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
} from '../../../universal/modules/user/userDuck';

export default () => next => action => {
  if ([LOGIN_SUCCESS, REGISTER_SUCCESS].includes(action.type)) {
    cookie.set('refresh_token', action.refresh_token);
  }

  return next(action);
};
