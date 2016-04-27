import request from 'axios';
import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { FETCH } from './../ducks/todo';

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';

export const FETCH_REQUEST = 'todo-sagas/FETCH_REQUEST';

function* fetchTodos() {
  try {
    const todos = yield call(request.get(BACKEND_URL));
    put(FETCH, { todos });
  } catch (err) {
    // pass
  }
}

export function* fetchTodosSaga() {
  takeEvery(FETCH_REQUEST, fetchTodos);
}
