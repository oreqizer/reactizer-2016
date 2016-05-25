import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../../consts/stateConsts';

import reducer, * as actions from '../userDuck';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from '../userActions';

jest.unmock('immutable');
jest.unmock('../userDuck');

const username = 'test';
const password = 'Testtest1';
const email = 'test@test.com';

describe('user action creators', () => {
  it('should make a login action', () => {
    const expected = {
      type: LOGIN,
      username,
      password,
    };

    expect(actions.loginUser({ username, password })).toEqual(expected);
  });

  it('should make a register action', () => {
    const expected = {
      type: REGISTER,
      email,
      username,
      password,
    };

    expect(actions.registerUser({ email, username, password })).toEqual(expected);
  });

  it('should make a logout action', () => {
    const expected = {
      type: LOGOUT,
    };

    expect(actions.logoutUser()).toEqual(expected);
  });
});

const mockError = 'user.error';
const mockToken = '1234abcd';
const mockUser = {
  username: 'test',
  email: 'test@test.com',
};

describe('user reducer', () => {
  it('should return initial state', () => {
    const { token, user, state, error } = reducer(undefined, {});

    expect(token).toBe(null);
    expect(user).toEqual(null);
    expect(state).toBe(CLEAN);
    expect(error).toBe(null);
  });

  it('should handle LOGIN request', () => {
    const { token, user, state, error } = reducer(undefined, {
      type: LOGIN,
      username,
      password,
    });

    expect(token).toBe(null);
    expect(user).toEqual(null);
    expect(state).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle REGISTER request', () => {
    const { token, user, state, error } = reducer(undefined, {
      type: REGISTER,
      username,
      password,
      email,
    });

    expect(token).toBe(null);
    expect(user).toEqual(null);
    expect(state).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const { token, user, state, error } = reducer(undefined, {
      type: LOGIN_SUCCESS,
      token: mockToken,
      user: mockUser,
    });

    expect(token).toBe(mockToken);
    expect(user).toEqual(mockUser);
    expect(state).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle REGISTER_SUCCESS', () => {
    const { token, user, state, error } = reducer(undefined, {
      type: REGISTER_SUCCESS,
      token: mockToken,
      user: mockUser,
    });

    expect(token).toBe(mockToken);
    expect(user).toEqual(mockUser);
    expect(state).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle LOGIN_ERROR', () => {
    const { token, user, state, error } = reducer(undefined, {
      type: LOGIN_ERROR,
      error: mockError,
    });

    expect(token).toBe(null);
    expect(user).toEqual(null);
    expect(state).toBe(ERROR);
    expect(error).toBe(mockError);
  });

  it('should handle REGISTER_ERROR', () => {
    const { token, user, state, error } = reducer(undefined, {
      type: REGISTER_ERROR,
      error: mockError,
    });

    expect(token).toBe(null);
    expect(user).toEqual(null);
    expect(state).toBe(ERROR);
    expect(error).toBe(mockError);
  });
});
