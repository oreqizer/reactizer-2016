import { call, put } from 'redux-saga/effects';

import { fetch, create, edit, remove } from './todoApi';

import {
  FETCH_SUCCESS,
  FETCH_ERROR,
  CREATE_SUCCESS,
  CREATE_ERROR,
  EDIT_SUCCESS,
  EDIT_ERROR,
  DELETE_SUCCESS,
  DELETE_ERROR,
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

export function* editTodo({ todo }) {
  try {
    const edited = yield call(edit, todo);
    yield put({ type: EDIT_SUCCESS, todo: edited });
  } catch (error) {
    yield put({ type: EDIT_ERROR, error });
  }
}

export function* deleteTodo({ todo }) {
  try {
    yield call(remove, todo);
    yield put({ type: DELETE_SUCCESS, id: todo.id });
  } catch (error) {
    yield put({ type: DELETE_ERROR, error });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
