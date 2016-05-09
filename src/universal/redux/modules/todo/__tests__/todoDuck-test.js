import { List } from 'immutable';

import { CLEAN, SUCCESS, LOADING } from '../../../../consts/stateConsts';

import reducer, * as actions from '../todoDuck';
import {
  FETCH,
  FETCH_SUCCESS,
  CREATE,
  CREATE_SUCCESS,
  EDIT,
  DELETE,
} from '../todoActions';

jest.unmock('immutable');
jest.unmock('../todoDuck');

describe('todo action creators', () => {
  it('should make a fetch action', () => {
    const expected = {
      type: FETCH,
    };

    expect(actions.fetchTodos()).toEqual(expected);
  });

  it('should make a create action', () => {
    const text = 'testing';
    const expected = {
      type: CREATE,
      text,
    };

    expect(actions.createTodo(text)).toEqual(expected);
  });

  it('should make an edit action', () => {
    const id = 1337;
    const text = 'testing';
    const expected = {
      type: EDIT,
      id,
      text,
    };

    expect(actions.editTodo(id, text)).toEqual(expected);
  });

  it('should make a delete action', () => {
    const id = 1337;
    const expected = {
      type: DELETE,
      id,
    };

    expect(actions.deleteTodo(id)).toEqual(expected);
  });
});

describe('todo reducer', () => {
  it('should return initial state', () => {
    const { list, state } = reducer(undefined, {});

    expect(list.equals(new List())).toBe(true);
    expect(state).toBe(CLEAN);
  });

  it('should handle FETCH request', () => {
    const { list, state } = reducer(undefined, {
      type: FETCH,
    });

    expect(list.equals(new List())).toBe(true);
    expect(state).toBe(LOADING);
  });

  it('should handle CREATE request', () => {
    const { list, state } = reducer(undefined, {
      type: CREATE,
      text: 'testing',
    });

    expect(list.equals(new List())).toBe(true);
    expect(state).toBe(LOADING);
  });

  it('should handle FETCH_SUCCESS', () => {
    const todos = ['a todo', 'two todos'];
    const { list, state } = reducer(undefined, {
      type: FETCH_SUCCESS,
      todos,
    });

    expect(list.equals(new List(todos))).toBe(true);
    expect(state).toBe(SUCCESS);
  });

  it('should handle CREATE_SUCCESS', () => {
    const text = 'testing';
    const { list, state } = reducer(undefined, {
      type: CREATE_SUCCESS,
      text,
    });

    expect(list.equals(new List([text]))).toBe(true);
    expect(state).toBe(SUCCESS);
  });

  it('should handle EDIT', () => {
    const old = 'testing123';
    const text = 'testing456';

    const initialized = reducer({
      list: [old],
    });

    const { list, state } = reducer(initialized, {
      type: EDIT,
      id: 0,
      text,
    });

    expect(list.equals(new List([text]))).toBe(true);
    expect(state).toBe(CLEAN);
  });

  it('should handle DELETE', () => {
    const old = 'testing123';

    const initialized = reducer({
      list: [old],
    });

    const { list, state } = reducer(initialized, {
      type: DELETE,
      id: 0,
    });

    expect(list.equals(new List())).toBe(true);
    expect(state).toBe(CLEAN);
  });
});
