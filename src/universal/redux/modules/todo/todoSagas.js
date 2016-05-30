import { Map } from 'immutable';
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
    const todos = res.data.todos.reduce((map, todo) => map.set(todo.id, new Todo(todo)), new Map());

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

    yield put({ type: EDIT_SUCCESS, todo: res.data });
  } catch (err) {
    yield put({ type: EDIT_ERROR, error: err.data });
  }
}

export function* deleteTodo({ todo }) {
  try {
    yield call(remove, todo);
    yield put({ type: DELETE_SUCCESS, id: todo.id });
  } catch (err) {
    yield put({ type: DELETE_ERROR, error: err.data });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
