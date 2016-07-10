import { call, put } from 'redux-saga/effects';
import { change } from 'redux-form';

import { fetch, create, edit, remove } from './todoApi';
import { toMap } from './todoMapper';

import Todo from '../../containers/Todo';

import { TODO } from '../../consts/formConsts';

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
    const { data } = yield call(fetch, { token });
    const todos = toMap(data.todos);

    yield put({ type: FETCH_SUCCESS, payload: { todos } });
  } catch ({ data }) {
    yield put({ type: FETCH_ERROR, payload: { error: data } });
  }
}

export function* createTodo({ token, text }) {
  try {
    const { data } = yield call(create, { token, text });

    yield put({ type: CREATE_SUCCESS, payload: { todo: new Todo(data) } });
    yield put(change(TODO, 'todo', ''));
  } catch ({ data }) {
    yield put({ type: CREATE_ERROR, payload: { error: data } });
  }
}

export function* editTodo({ token, todo }) {
  try {
    const { data } = yield call(edit, { todo, token });

    yield put({ type: EDIT_SUCCESS, payload: { todo: new Todo(data) } });
  } catch ({ data }) {
    yield put({ type: EDIT_ERROR, payload: { error: data } });
  }
}

export function* deleteTodo({ token, id }) {
  try {
    yield call(remove, { id, token });
    yield put({ type: DELETE_SUCCESS, id });
  } catch ({ data }) {
    yield put({ type: DELETE_ERROR, payload: { error: data } });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
