import { call, put } from 'redux-saga/effects';
import { change } from 'redux-form';

import { fetch, create, edit, remove } from './todoApi';
import { toMap } from './todoMapper';

import Todo from '../../containers/Todo';

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

export function* fetchTodos({ token }) {
  try {
    const res = yield call(fetch, { token });
    const todos = toMap(res.data.todos);

    yield put({ type: FETCH_SUCCESS, todos });
  } catch (err) {
    yield put({ type: FETCH_ERROR, error: err.data });
  }
}

export function* createTodo({ token, text }) {
  try {
    const res = yield call(create, { token, text });

    yield put({ type: CREATE_SUCCESS, todo: new Todo(res.data) });
    yield put(change('todos/create', 'todo', ''));
  } catch (err) {
    yield put({ type: CREATE_ERROR, error: err.data });
  }
}

export function* editTodo({ token, todo }) {
  try {
    const res = yield call(edit, { todo, token });

    yield put({ type: EDIT_SUCCESS, todo: new Todo(res.data) });
  } catch (err) {
    yield put({ type: EDIT_ERROR, error: err.data });
  }
}

export function* deleteTodo({ token, id }) {
  try {
    yield call(remove, { id, token });
    yield put({ type: DELETE_SUCCESS, id });
  } catch (err) {
    yield put({ type: DELETE_ERROR, error: err.data });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
