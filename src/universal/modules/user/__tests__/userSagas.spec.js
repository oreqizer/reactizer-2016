import { put, call } from 'redux-saga/effects';
import { startSubmit, stopSubmit } from 'redux-form';
import { push } from 'react-router-redux';

import * as sagas from '../userSagas';
import * as userApi from '../userApi';

import { LOGIN, REGISTER } from '../../../consts/formConsts';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../userDuck';

jest.unmock('redux-saga/effects');
jest.unmock('react-router-redux');
jest.unmock('redux-form');
jest.unmock('axios'); // not used
jest.unmock('../userSagas');
jest.unmock('../userDuck');

const email = 'test@test.com';
const username = 'test';
const password = 'Testtest1';

describe('user sagas', () => {
  it('should go through loginUser', () => {
    const payload = { username, password };
    const saga = sagas.loginUser({
      payload,
    });

    // start form submit
    const startedSubmit = saga.next().value;
    expect(startedSubmit).toEqual(put(startSubmit(LOGIN)));

    // api call
    const request = saga.next().value;
    expect(request).toEqual(call(userApi.login, payload));

    // api response
    const data = {};
    const response = saga.next({ data }).value;
    expect(response).toEqual(put({
      type: LOGIN_SUCCESS,
      payload: {},
    }));

    // redirection
    const redirection = saga.next().value;
    expect(redirection).toEqual(put(push('/todos')));

    // stop form submit
    const stoppedSubmit = saga.next().value;
    expect(stoppedSubmit).toEqual(put(stopSubmit(LOGIN)));
  });

  it('should catch error in loginUser', () => {
    const payload = { username, password };
    const saga = sagas.loginUser({
      payload,
    });

    // start form submit
    const startedSubmit = saga.next().value;
    expect(startedSubmit).toEqual(put(startSubmit(LOGIN)));

    // api call
    const request = saga.next().value;
    expect(request).toEqual(call(userApi.login, payload));

    // api error
    const error = 'error';
    const response = saga.throw({ data: error }).value;
    expect(response).toEqual(put({
      type: LOGIN_ERROR,
      payload: { error },
    }));

    // stop form submit
    const stoppedSubmit = saga.next().value;
    expect(stoppedSubmit).toEqual(put(stopSubmit(LOGIN)));
  });

  it('should go through registerUser', () => {
    const payload = { email, username, password };
    const saga = sagas.registerUser({
      payload,
    });

    // start form submit
    const startedSubmit = saga.next().value;
    expect(startedSubmit).toEqual(put(startSubmit(REGISTER)));

    // api call
    const request = saga.next().value;
    expect(request).toEqual(call(userApi.register, payload));

    // api response
    const data = {};
    const response = saga.next({ data }).value;
    expect(response).toEqual(put({
      type: REGISTER_SUCCESS,
      payload: {},
    }));

    // redirection
    const redirection = saga.next().value;
    expect(redirection).toEqual(put(push('/todos')));

    // stop form submit
    const stoppedSubmit = saga.next().value;
    expect(stoppedSubmit).toEqual(put(stopSubmit(REGISTER)));
  });

  it('should catch error in registerUser', () => {
    const payload = { email, username, password };
    const saga = sagas.registerUser({
      payload,
    });

    // start form submit
    const startedSubmit = saga.next().value;
    expect(startedSubmit).toEqual(put(startSubmit(REGISTER)));

    // api call
    const request = saga.next().value;
    expect(request).toEqual(call(userApi.register, payload));

    // api error
    const error = 'error';
    const response = saga.throw({ data: error }).value;
    expect(response).toEqual(put({
      type: REGISTER_ERROR,
      payload: { error },
    }));

    // stop form submit
    const stoppedSubmit = saga.next().value;
    expect(stoppedSubmit).toEqual(put(stopSubmit(REGISTER)));
  });
});
