import request from 'axios';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { FETCH, FETCH_REQUEST, CREATE, CREATE_REQUEST } from './../ducks/todoDuck';

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

function* fetchTodos() {
  console.log('fetching')
  try {
    const res = yield call(request.get, BACKEND_URL);
    yield put({ type: FETCH, todos: res.data });
  } catch (err) {
    // pass
  }
}

function* createTodo({ text }) {
  try {
    const res = yield call(request.post, BACKEND_URL, { text });
    yield put({ type: CREATE, text: res.data.text });
  } catch (err) {
    // pass
  }
}

export function* fetchTodosSaga() {
  console.log('APPLIED')
  yield* takeEvery(FETCH_REQUEST, fetchTodos);
}

export function* createTodoSaga() {
  yield* takeEvery(CREATE_REQUEST, createTodo);
}
