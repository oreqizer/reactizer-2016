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
    const profile = yield call(login, data);
    yield put({ type: LOGIN_SUCCESS, ...profile });
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error: error.data });
  }
}

export function* registerUser(data) {
  try {
    const profile = yield call(register, data);
    yield put({ type: REGISTER_SUCCESS, ...profile });
  } catch (error) {
    yield put({ type: REGISTER_ERROR, error: error.data });
  }
}
