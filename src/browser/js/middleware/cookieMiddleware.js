import cookie from 'js-cookie';

import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  LOGOUT,
} from '../../../universal/modules/user/userDuck';

import {
  SET_LOCALE,
} from '../../../../src/universal/modules/intl/intlDuck';

import {
  REFRESH_TOKEN,
  LOCALE,
} from '../../../universal/consts/cookieConsts';

export default () => next => action => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      cookie.set(REFRESH_TOKEN, action.refresh_token);
      break;

    case LOGOUT:
      cookie.remove(REFRESH_TOKEN);
      break;

    case SET_LOCALE:
      cookie.set(LOCALE, action.locale);
      break;

    default:
      break;
  }

  return next(action);
};
