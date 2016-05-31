import { Record } from 'immutable';

import User from '../../../containers/User';
import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../consts/phaseConsts';

export const LOGIN = 'user/LOGIN';
export const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'user/LOGIN_ERROR';

export const REFRESH = 'user/REFRESH';
export const REFRESH_SUCCESS = 'user/REFRESH_SUCCESS';
export const REFRESH_ERROR = 'user/REFRESH_ERROR';

export const LOGOUT = 'user/LOGOUT';

export const REGISTER = 'user/REGISTER';
export const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
export const REGISTER_ERROR = 'user/REGISTER_ERROR';

const InitialState = new Record({
  token: null,
  refreshToken: null,
  user: null,
  phase: CLEAN,
  error: null,
});

function toInitialState(state) {
  return new InitialState({
    ...state,
    user: state.user ? new User(state.user) : null,
  });
}

export default function todoReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return toInitialState(state);

  switch (action.type) {
    case LOGIN:
    case REFRESH:
    case REGISTER:
      return new InitialState({
        phase: LOADING,
      });

    case LOGIN_SUCCESS:
    case REFRESH_SUCCESS:
    case REGISTER_SUCCESS:
      return state
        .set('user', action.user)
        .set('token', action.token)
        .set('refreshToken', action.refreshToken)
        .set('phase', SUCCESS);

    case LOGIN_ERROR:
    case REFRESH_ERROR:
    case REGISTER_ERROR:
      return state
        .set('phase', ERROR)
        .set('error', action.error);

    case LOGOUT:
      return new InitialState;

    default:
      return state;
  }
}

export function loginUser({ username, password }) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function refreshUser({ refreshToken }) {
  return {
    type: REFRESH,
    refreshToken,
  };
}

export function registerUser({ email, username, password }) {
  return {
    type: REGISTER,
    email,
    username,
    password,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}
