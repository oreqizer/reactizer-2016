import { call, put } from 'redux-saga/effects';
import { change } from 'redux-form';

import { fetch, create, edit, remove } from './todoApi';
import { toMap } from './todoMapper';

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

export function* fetchTodos({ payload }) {
  try {
    const { data } = yield call(fetch, payload);
    const todos = toMap(data.todos);

    yield put({ type: FETCH_SUCCESS, payload: { todos } });
  } catch ({ data }) {
    yield put({ type: FETCH_ERROR, payload: { error: data } });
  }
}

export function* createTodo({ payload }) {
  try {
    const { data } = yield call(create, payload);

    yield put({ type: CREATE_SUCCESS, payload: { todo: data } });
    yield put(change(TODO, 'todo', '')); // resets input field
  } catch ({ data }) {
    yield put({ type: CREATE_ERROR, payload: { error: data } });
  }
}

export function* editTodo({ payload }) {
  try {
    const { data } = yield call(edit, payload);

    yield put({ type: EDIT_SUCCESS, payload: { todo: data } });
  } catch ({ data }) {
    yield put({ type: EDIT_ERROR, payload: { error: data } });
  }
}

export function* deleteTodo({ payload }) {
  try {
    yield call(remove, payload);
    yield put({ type: DELETE_SUCCESS, payload: { id: payload.id } });
  } catch ({ data }) {
    yield put({ type: DELETE_ERROR, payload: { error: data } });
  }
}

export function* resetTodos() {
  yield put({ type: RESET });
}
