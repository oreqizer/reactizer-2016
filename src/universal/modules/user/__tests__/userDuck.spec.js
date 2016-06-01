import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../consts/phaseConsts';

import reducer, * as duck from '../userDuck';

const {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REFRESH,
  REFRESH_SUCCESS,
  REFRESH_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} = duck;

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

    expect(duck.loginUser({ username, password })).toEqual(expected);
  });

  it('should make a refresh action', () => {
    const refreshToken = '1243asdf';
    const expected = {
      type: REFRESH,
      refreshToken,
    };

    expect(duck.refreshUser({ refreshToken })).toEqual(expected);
  });

  it('should make a register action', () => {
    const expected = {
      type: REGISTER,
      email,
      username,
      password,
    };

    expect(duck.registerUser({ email, username, password })).toEqual(expected);
  });

  it('should make a logout action', () => {
    const expected = {
      type: LOGOUT,
    };

    expect(duck.logoutUser()).toEqual(expected);
  });
});

const mockError = 'user.error';
const mockToken = '1234abcd';
const mockRefreshToken = '5678zxcv';
const mockUser = {
  username: 'test',
  email: 'test@test.com',
};

describe('user reducer', () => {
  it('should return initial state', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {});

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(CLEAN);
    expect(error).toBe(null);
  });

  it('should handle LOGIN request', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: LOGIN,
      username,
      password,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle REFRESH request', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: REFRESH,
      refreshToken: mockRefreshToken,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle REGISTER request', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: REGISTER,
      username,
      password,
      email,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle LOGOUT', () => {
    const initialState = reducer({
      roken: mockToken,
      refreshToken: mockRefreshToken,
      user: mockUser,
      phase: SUCCESS,
      error: null,
    });

    const { token, refreshToken, user, phase, error } = reducer(initialState, {
      type: LOGOUT,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(CLEAN);
    expect(error).toBe(null);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: LOGIN_SUCCESS,
      token: mockToken,
      refreshToken: mockRefreshToken,
      user: mockUser,
    });

    expect(token).toBe(mockToken);
    expect(refreshToken).toBe(mockRefreshToken);
    expect(user).toEqual(mockUser);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle REFRESH_SUCCESS', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: REFRESH_SUCCESS,
      token: mockToken,
      refreshToken: mockRefreshToken,
      user: mockUser,
    });

    expect(token).toBe(mockToken);
    expect(refreshToken).toBe(mockRefreshToken);
    expect(user).toEqual(mockUser);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle REGISTER_SUCCESS', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: REGISTER_SUCCESS,
      token: mockToken,
      refreshToken: mockRefreshToken,
      user: mockUser,
    });

    expect(token).toBe(mockToken);
    expect(refreshToken).toBe(mockRefreshToken);
    expect(user).toEqual(mockUser);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle LOGIN_ERROR', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: LOGIN_ERROR,
      error: mockError,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(ERROR);
    expect(error).toBe(mockError);
  });

  it('should handle REFRESH_ERROR', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: REFRESH_ERROR,
      error: mockError,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(ERROR);
    expect(error).toBe(mockError);
  });

  it('should handle REGISTER_ERROR', () => {
    const { token, refreshToken, user, phase, error } = reducer(undefined, {
      type: REGISTER_ERROR,
      error: mockError,
    });

    expect(token).toBe(null);
    expect(refreshToken).toBe(null);
    expect(user).toEqual(null);
    expect(phase).toBe(ERROR);
    expect(error).toBe(mockError);
  });
});
