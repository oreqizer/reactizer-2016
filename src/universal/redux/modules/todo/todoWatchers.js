import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { fetchTodos, createTodo, editTodo, deleteTodo, resetTodos } from './todoSagas';

import { FETCH, CREATE, EDIT, DELETE } from './todoActions';
import { LOGOUT } from '../user/userActions';

function* fetchTodosWatcher() {
  yield* takeEvery(FETCH, fetchTodos);
}

function* createTodoWatcher() {
  yield* takeEvery(CREATE, createTodo);
}

function* editTodoWatcher() {
  yield* takeEvery(EDIT, editTodo);
}

function* deleteTodoWatcher() {
  yield* takeEvery(DELETE, deleteTodo);
}

function* logoutWatcher() {
  yield* takeEvery(LOGOUT, resetTodos);
}

export default function* todoWatchers() {
  yield [
    fork(fetchTodosWatcher),
    fork(createTodoWatcher),
    fork(editTodoWatcher),
    fork(deleteTodoWatcher),
    fork(logoutWatcher),
  ];
}
