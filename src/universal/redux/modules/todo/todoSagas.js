import { Set } from 'immutable';
import { call, put } from 'redux-saga/effects';

import { fetch, create, edit, remove } from './todoApi';

import Todo from '../../../containers/Todo';

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
} from './todoDuck';

export function* fetchTodos() {
  try {
    const res = yield call(fetch);
    const todos = new Set(res.data.todos.map(todo => new Todo(todo)));

    yield put({ type: FETCH_SUCCESS, todos });
  } catch (err) {
    yield put({ type: FETCH_ERROR, error: err.data });
  }
}

export function* createTodo({ text }) {
  try {
    const res = yield call(create, { text });

    yield put({ type: CREATE_SUCCESS, todo: res.data });
  } catch (err) {
    yield put({ type: CREATE_ERROR, error: err.data });
  }
}

export function* editTodo({ todo }) {
  try {
    const res = yield call(edit, todo);

    yield put({ type: EDIT_SUCCESS, oldTodo: todo, newTodo: res.data });
  } catch (err) {
    yield put({ type: EDIT_ERROR, error: err.data });
  }
}

export function* deleteTodo({ todo }) {
  try {
    yield call(remove, todo);
    yield put({ type: DELETE_SUCCESS, todo });
  } catch (err) {
    yield put({ type: DELETE_ERROR, error: err.data });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
