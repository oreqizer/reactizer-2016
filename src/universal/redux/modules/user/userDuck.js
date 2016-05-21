import { Record, fromJS } from 'immutable';

import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../consts/stateConsts';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './userActions';

const InitialState = new Record({
  token: null,
  user: null,
  state: CLEAN,
  error: null,
});

export default function todoReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return new InitialState(fromJS(state));

  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return new InitialState({
        state: LOADING,
      });

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return state
        .set('user', action.user)
        .set('token', action.token)
        .set('state', SUCCESS);

    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return state
        .set('state', ERROR)
        .set('error', action.error);

    case LOGOUT:
      return new InitialState;

    default:
      return state;
  }
}

export function login({ username, password }) {
  return {
    type: LOGIN,
    username,
    password,
  };
}

export function register({ email, username, password }) {
  return {
    type: REGISTER,
    email,
    username,
    password,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
