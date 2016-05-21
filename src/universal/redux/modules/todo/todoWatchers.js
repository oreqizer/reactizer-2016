import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { fetchTodos, createTodo, resetTodos } from './todoSagas';

import { FETCH, CREATE } from './todoActions';
import { LOGOUT } from '../user/userActions';

function* fetchTodosWatcher() {
  yield* takeEvery(FETCH, fetchTodos);
}

function* createTodoWatcher() {
  yield* takeEvery(CREATE, createTodo);
}

function* logoutWatcher() {
  yield* takeEvery(LOGOUT, resetTodos);
}

export default function* todoWatchers() {
  yield [
    fork(fetchTodosWatcher),
    fork(createTodoWatcher),
    fork(logoutWatcher),
  ];
}
