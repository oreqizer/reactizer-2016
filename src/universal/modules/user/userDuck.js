import Rx from 'rxjs/Rx';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';
import { Record } from 'immutable';

import { loginApi, registerApi } from './userApi';

import User from '../../containers/User';
import { INIT, SUCCESS, LOADING, ERROR } from '../../consts/phaseConsts';

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

export const CLEAR_ERROR = 'user/CLEAR_ERROR';

const InitialState = new Record({
  token: null,
  refreshToken: null,
  user: null,
  phase: INIT,
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
        .set('user', new User(action.payload.user))
        .set('token', action.payload.token)
        .set('refreshToken', action.payload.refreshToken)
        .set('phase', SUCCESS);

    case LOGIN_ERROR:
    case REFRESH_ERROR:
    case REGISTER_ERROR:
      return state
        .set('phase', ERROR)
        .set('error', String(action.payload.error));

    case CLEAR_ERROR:
      return state
        .set('error', null)
        .set('phase', INIT);

    case LOGOUT:
      return new InitialState();

    default:
      return state;
  }
}

export const loginUser = ({ username, password }) => ({
  type: LOGIN,
  payload: { username, password },
});

export const refreshUser = refreshToken => ({
  type: REFRESH,
  payload: { refreshToken },
});

export const registerUser = ({ email, username, password }) => ({
  type: REGISTER,
  payload: { email, username, password },
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const logoutUser = () => ({
  type: LOGOUT,
});

const loginUserEpic = action$ =>
  action$.ofType(LOGIN)
    .mergeMap(action => loginApi(action.payload))
    .map(data => ({
      type: LOGIN_SUCCESS,
      payload: data,
    }))
    .catch(error => Rx.Observable.of({
      type: LOGIN_ERROR,
      payload: { error },
    }));

const loginStartEpic = action$ =>
  action$.ofType(LOGIN)
    .mapTo(startSubmit('login'));

const loginFinishEpic = action$ =>
  Rx.Observable.merge(
    action$.ofType(LOGIN_SUCCESS),
    action$.ofType(LOGIN_ERROR),
  )
    .mapTo(stopSubmit('login'));

const registerUserEpic = action$ =>
  action$.ofType(REGISTER)
    .mergeMap(action => registerApi(action.payload))
    .map(data => ({
      type: REGISTER_SUCCESS,
      payload: data,
    }))
    .catch(error => Rx.Observable.of({
      type: REGISTER_ERROR,
      payload: { error },
    }));

const registerStartEpic = action$ =>
  action$.ofType(REGISTER)
    .mapTo(startSubmit('register'));

const registerFinishEpic = action$ =>
  Rx.Observable.merge(
    action$.ofType(REGISTER_SUCCESS),
    action$.ofType(REGISTER_ERROR),
  )
    .mapTo(stopSubmit('register'));

const redirectEpic = action$ =>
  Rx.Observable.merge(
    action$.ofType(LOGIN_SUCCESS),
    action$.ofType(REGISTER_SUCCESS),
    action$.ofType(REFRESH_SUCCESS),
  )
    .mapTo(push('/todos'));

export const userEpic = combineEpics(
  loginUserEpic,
  loginStartEpic,
  loginFinishEpic,
  registerUserEpic,
  registerStartEpic,
  registerFinishEpic,
  redirectEpic,
);
