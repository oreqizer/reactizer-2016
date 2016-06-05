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
    yield put(startSubmit('signup'));
    const { data } = yield call(login, action);
    const user = new User(data.user);

    yield put({ type: LOGIN_SUCCESS, ...data, user });
    yield put(push('/todos'));
  } catch ({ data }) {
    yield put({ type: LOGIN_ERROR, error: data });
  } finally {
    yield put(stopSubmit('signup'));
  }
}

export function* registerUser(action) {
  try {
    yield put(startSubmit('signup'));
    const { data } = yield call(register, action);
    const user = new User(data.user);

    yield put({ type: REGISTER_SUCCESS, ...data, user });
    yield put(push('/todos'));
  } catch ({ data }) {
    yield put({ type: REGISTER_ERROR, error: data });
  } finally {
    yield put(stopSubmit('signup'));
  }
}
