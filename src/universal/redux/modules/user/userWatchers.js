import { takeEvery } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { loginUser, registerUser } from './userSagas';

import { LOGIN, REGISTER } from './userDuck';

function* loginUserWatcher() {
  yield* takeEvery(LOGIN, loginUser);
}

function* registerUserWatcher() {
  yield* takeEvery(REGISTER, registerUser);
}

export default function* todoWatchers() {
  yield [
    fork(loginUserWatcher),
    fork(registerUserWatcher),
  ];
}
