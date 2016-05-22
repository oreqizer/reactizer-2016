import { Map } from 'immutable';

import Todo, { mapFromArray } from '../../../../containers/Todo';
import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../../consts/stateConsts';

import reducer, * as actions from '../todoDuck';
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_ERROR,
  CREATE,
  CREATE_SUCCESS,
  CREATE_ERROR,
  EDIT,
  EDIT_SUCCESS,
  EDIT_ERROR,
  DELETE,
  DELETE_SUCCESS,
  DELETE_ERROR,
  RESET,
} from '../todoActions';

jest.unmock('immutable');
jest.unmock('../todoDuck');
jest.unmock('../../../../containers/Todo');

const id = 1337;
const id2 = 420;
const text = 'testing456';
const text2 = 'testing123';
const done = false;
const errorMsg = 'todos.error';

const todo = new Todo({
  id,
  text,
  done,
});

const todoEdit = new Todo({
  id,
  text: text2,
  done: true,
});

const todo2 = new Todo({
  id: id2,
  text: text2,
  done,
});

const todosMock = mapFromArray([todo, todo2]);

describe('todo action creators', () => {
  it('should make a fetch action', () => {
    const expected = {
      type: FETCH,
    };

    expect(actions.fetchTodos()).toEqual(expected);
  });

  it('should make a create action', () => {
    const expected = {
      type: CREATE,
      text,
    };

    expect(actions.createTodo(text)).toEqual(expected);
  });

  it('should make an edit action', () => {
    const expected = {
      type: EDIT,
      todo,
    };

    expect(actions.editTodo(todo)).toEqual(expected);
  });

  it('should make a delete action', () => {
    const expected = {
      type: DELETE,
      todo,
    };

    expect(actions.deleteTodo(todo)).toEqual(expected);
  });

  it('should make a delete action', () => {
    const expected = {
      type: RESET,
    };

    expect(actions.resetTodos()).toEqual(expected);
  });
});

describe('todo reducer', () => {
  it('should return initial state', () => {
    const { todos, state, error } = reducer(undefined, {});

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(CLEAN);
    expect(error).toBe(null);
  });

  it('should handle FETCH request', () => {
    const { todos, state, error } = reducer(undefined, {
      type: FETCH,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle CREATE request', () => {
    const { todos, state, error } = reducer(undefined, {
      type: CREATE,
      text,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle EDIT request', () => {
    const { todos, state, error } = reducer(undefined, {
      type: EDIT,
      todo,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle DELETE request', () => {
    const { todos, state, error } = reducer(undefined, {
      type: DELETE,
      todo,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle FETCH_SUCCESS', () => {
    const { todos, state, error } = reducer(undefined, {
      type: FETCH_SUCCESS,
      todos: todosMock,
    });

    expect(todos.equals(todosMock)).toBe(true);
    expect(state).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle CREATE_SUCCESS', () => {
    const { todos, state, error } = reducer(undefined, {
      type: CREATE_SUCCESS,
      todo,
    });

    const expectedMap = new Map().set(todo.id, new Todo(todo));

    expect(todos.equals(expectedMap)).toBe(true);
    expect(state).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle EDIT_SUCCESS', () => {
    const initialState = reducer({
      todos: todosMock,
    });

    const { todos, state, error } = reducer(initialState, {
      type: EDIT_SUCCESS,
      todo: todoEdit,
    });

    const expectedTodos = todosMock.set(todoEdit.id, todoEdit);

    expect(todos.equals(expectedTodos)).toBe(true);
    expect(state).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle DELETE_SUCCESS', () => {
    const expectedMap = todosMock.delete(todo.id);
    const initialState = reducer({
      todos: todosMock,
    });

    const { todos, state, error } = reducer(initialState, {
      type: DELETE_SUCCESS,
      todo,
    });

    expect(todos.equals(expectedMap)).toBe(true);
    expect(state).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle FETCH_ERROR', () => {
    const { todos, state, error } = reducer(undefined, {
      type: FETCH_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle CREATE_ERROR', () => {
    const { todos, state, error } = reducer(undefined, {
      type: CREATE_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle EDIT_ERROR', () => {
    const { todos, state, error } = reducer(undefined, {
      type: EDIT_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle DELETE_ERROR', () => {
    const { todos, state, error } = reducer(undefined, {
      type: DELETE_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle RESET', () => {
    const initialState = reducer({
      todos: todosMock,
      state: SUCCESS,
    });

    const { todos, state, error } = reducer(initialState, {
      type: RESET,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(state).toBe(CLEAN);
    expect(error).toBe(null);
  });
});
