import { call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';

import { login, register } from './userApi';

import User from '../../containers/User';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './userDuck';

export function* loginUser(action) {
  try {
    yield put(startSubmit('signup/login'));
    const res = yield call(login, action);
    const user = new User(res.data.user);

    yield put({ type: LOGIN_SUCCESS, ...res.data, user });
    yield put(push('/todos'));
  } catch ({ data }) {
    yield put({ type: LOGIN_ERROR, error: data });
  } finally {
    yield put(stopSubmit('signup/login'));
  }
}

export function* registerUser(action) {
  try {
    yield put(startSubmit('signup/register'));
    const res = yield call(register, action);
    const user = new User(res.data.user);

    yield put({ type: REGISTER_SUCCESS, ...res.data, user });
    yield put(push('/todos'));
  } catch ({ data }) {
    yield put({ type: REGISTER_ERROR, error: data });
  } finally {
    yield put(stopSubmit('signup/register'));
  }
}
