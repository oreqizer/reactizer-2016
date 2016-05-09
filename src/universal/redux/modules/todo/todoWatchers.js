import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { fetchTodos, createTodo } from './todoSagas';

import {
  FETCH,
  CREATE,
} from './todoActions';

function* fetchTodosWatcher() {
  yield* takeEvery(FETCH, fetchTodos);
}

function* createTodoWatcher() {
  yield* takeEvery(CREATE, createTodo);
}

export default function* todoWatchers() {
  yield [
    fork(fetchTodosWatcher),
    fork(createTodoWatcher),
  ];
}
