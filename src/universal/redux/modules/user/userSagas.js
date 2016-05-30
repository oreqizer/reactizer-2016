import { call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';
import axios from 'axios';

import { login, register } from './userApi';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './userDuck';

export function* loginUser(data) {
  try {
    yield put(startSubmit('login'));
    const res = yield call(login, data);

    axios.defaults.headers.common.Authorization = res.data.token;

    yield put({ type: LOGIN_SUCCESS, ...res.data });
    yield put(push('/todos'));
  } catch (err) {
    yield put({ type: LOGIN_ERROR, error: err.data });
  } finally {
    yield put(stopSubmit('login'));
  }
}

export function* registerUser(data) {
  try {
    yield put(startSubmit('register'));
    const res = yield call(register, data);

    axios.defaults.headers.common.Authorization = res.data.token;

    yield put({ type: REGISTER_SUCCESS, ...res.data });
    yield put(push('/todos'));
  } catch (err) {
    yield put({ type: REGISTER_ERROR, error: err.data });
  } finally {
    yield put(stopSubmit('register'));
  }
}

export function* logoutUser() {
  axios.defaults.headers.common.Authorization = null;
}
