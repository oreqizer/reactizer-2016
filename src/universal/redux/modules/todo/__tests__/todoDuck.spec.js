import { Map } from 'immutable';

import Todo from '../../../../containers/Todo';
import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../../consts/phaseConsts';

import reducer, * as duck from '../todoDuck';

const {
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
} = duck;

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

const todosMock = new Map()
  .set(todo.id, todo)
  .set(todo2.id, todo2);

describe('todo action creators', () => {
  it('should make a fetch action', () => {
    const expected = {
      type: FETCH,
    };

    expect(duck.fetchTodos()).toEqual(expected);
  });

  it('should make a create action', () => {
    const expected = {
      type: CREATE,
      text,
    };

    expect(duck.createTodo(text)).toEqual(expected);
  });

  it('should make an edit action', () => {
    const expected = {
      type: EDIT,
      todo,
    };

    expect(duck.editTodo(todo)).toEqual(expected);
  });

  it('should make a delete action', () => {
    const expected = {
      type: DELETE,
      todo,
    };

    expect(duck.deleteTodo(todo)).toEqual(expected);
  });

  it('should make a delete action', () => {
    const expected = {
      type: RESET,
    };

    expect(duck.resetTodos()).toEqual(expected);
  });
});

describe('todo reducer', () => {
  it('should return initial state', () => {
    const { todos, phase, error } = reducer(undefined, {});

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(CLEAN);
    expect(error).toBe(null);
  });

  it('should handle FETCH request', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: FETCH,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle CREATE request', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: CREATE,
      text,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle EDIT request', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: EDIT,
      todo,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle DELETE request', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: DELETE,
      todo,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle FETCH_SUCCESS', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: FETCH_SUCCESS,
      todos: todosMock,
    });

    expect(todos.equals(todosMock)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle CREATE_SUCCESS', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: CREATE_SUCCESS,
      todo,
    });

    const expectedMap = new Map().set(todo.id, new Todo(todo));

    expect(todos.equals(expectedMap)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle EDIT_SUCCESS', () => {
    const initialState = reducer({
      todos: todosMock,
    });

    const { todos, phase, error } = reducer(initialState, {
      type: EDIT_SUCCESS,
      todo: todoEdit,
    });

    const expectedTodos = todosMock.set(todoEdit.id, todoEdit);

    expect(todos.equals(expectedTodos)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle DELETE_SUCCESS', () => {
    const expectedMap = todosMock.delete(todo.id);
    const initialState = reducer({
      todos: todosMock,
    });

    const { todos, phase, error } = reducer(initialState, {
      type: DELETE_SUCCESS,
      todo,
    });

    expect(todos.equals(expectedMap)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle FETCH_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: FETCH_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle CREATE_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: CREATE_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle EDIT_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: EDIT_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle DELETE_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: DELETE_ERROR,
      error: errorMsg,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle RESET', () => {
    const initialState = reducer({
      todos: todosMock,
      phase: SUCCESS,
    });

    const { todos, phase, error } = reducer(initialState, {
      type: RESET,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(CLEAN);
    expect(error).toBe(null);
  });
});

