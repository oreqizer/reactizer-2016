import request from 'axios';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { FETCH_SUCCESS, FETCH, CREATE_SUCCESS, CREATE } from './../ducks/todoDuck';

// TODO: for demonstration pursposes
const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

function* fetchTodos() {
  try {
    const res = yield call(request.get, BACKEND_URL);
    yield put({ type: FETCH_SUCCESS, todos: res.data });
  } catch (err) {
    // pass
  }
}

function* createTodo({ text }) {
  try {
    const res = yield call(request.post, BACKEND_URL, { text });
    yield put({ type: CREATE_SUCCESS, text: res.data.text });
  } catch (err) {
    // pass
  }
}

export function* fetchTodosWatcher() {
  yield* takeEvery(FETCH, fetchTodos);
}

export function* createTodoWatcher() {
  yield* takeEvery(CREATE, createTodo);
}

export default {
  fetchTodos,
  createTodo,
};
