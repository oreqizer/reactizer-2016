import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { loginUser, registerUser, logoutUser } from './userSagas';

import { LOGIN, REGISTER, LOGOUT } from './userDuck';

function* loginUserWatcher() {
  yield* takeLatest(LOGIN, loginUser);
}

function* registerUserWatcher() {
  yield* takeLatest(REGISTER, registerUser);
}

function* logoutUserWatcher() {
  yield* takeLatest(LOGOUT, logoutUser);
}

export default function* todoWatchers() {
  yield [
    fork(loginUserWatcher),
    fork(registerUserWatcher),
    fork(logoutUserWatcher),
  ];
}
