import { takeLatest } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { loginUser, registerUser } from './userSagas';

import { LOGIN, REGISTER } from './userDuck';

function* loginUserWatcher() {
  yield* takeLatest(LOGIN, loginUser);
}

function* registerUserWatcher() {
  yield* takeLatest(REGISTER, registerUser);
}

export default function* todoWatchers() {
  yield [
    fork(loginUserWatcher),
    fork(registerUserWatcher),
  ];
}
