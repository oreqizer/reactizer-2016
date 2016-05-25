import { call, put } from 'redux-saga/effects';

import { login, register } from './userApi';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './userDuck';

export function* loginUser(data) {
  try {
    const res = yield call(login, data);

    yield put({ type: LOGIN_SUCCESS, ...res.data });
  } catch (err) {
    yield put({ type: LOGIN_ERROR, error: err.data });
  }
}

export function* registerUser(data) {
  try {
    const res = yield call(register, data);

    yield put({ type: REGISTER_SUCCESS, ...res.data });
  } catch (err) {
    yield put({ type: REGISTER_ERROR, error: err.data });
  }
}
