import { call, put } from 'redux-saga/effects';

import { fetch, create } from '../../../api/todoApi';

import {
  FETCH_SUCCESS,
  CREATE_SUCCESS,
  FETCH_ERROR,
  CREATE_ERROR,
  RESET,
} from './todoActions';

export function* fetchTodos() {
  try {
    const { todos } = yield call(fetch);
    yield put({ type: FETCH_SUCCESS, todos });
  } catch (error) {
    yield put({ type: FETCH_ERROR, error });
  }
}

export function* createTodo({ text }) {
  try {
    const todo = yield call(create, { text });
    yield put({ type: CREATE_SUCCESS, todo });
  } catch (error) {
    yield put({ type: CREATE_ERROR, error });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
