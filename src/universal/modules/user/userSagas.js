import { call, put } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';

import { login, register } from './userApi';

import { LOGIN, REGISTER } from '../../consts/formConsts';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './userDuck';

export function* loginUser({ payload }) {
  try {
    yield put(startSubmit(LOGIN));
    const { data } = yield call(login, payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: {
        ...data,
        refreshToken: data.refresh_token,
      },
    });

    yield put(push('/todos'));
  } catch ({ data }) {
    yield put({ type: LOGIN_ERROR, payload: { error: data } });
  }

  yield put(stopSubmit(LOGIN));
}

export function* registerUser({ payload }) {
  try {
    yield put(startSubmit(REGISTER));
    const { data } = yield call(register, payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: {
        ...data,
        refreshToken: data.refresh_token,
      },
    });

    yield put(push('/todos'));
  } catch ({ data }) {
    yield put({ type: REGISTER_ERROR, payload: { error: data } });
  }

  yield put(stopSubmit(REGISTER));
}
