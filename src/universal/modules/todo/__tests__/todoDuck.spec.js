import { Map } from 'immutable';

import Todo from '../../../containers/Todo';
import { INIT, SUCCESS, LOADING, ERROR } from '../../../consts/phaseConsts';

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

const id = 1337;
const id2 = 420;
const text = 'testing456';
const text2 = 'testing123';
const done = false;
const errorMsg = 'todos.error';

const todo = {
  id,
  text,
  done,
};

const todoEdit = {
  id,
  text: text2,
  done: true,
};

const todo2 = {
  id: id2,
  text: text2,
  done,
};

const todosMock = new Map()
  .set(todo.id, new Todo(todo))
  .set(todo2.id, new Todo(todo2));

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
      payload: { text },
    };

    expect(duck.createTodo(text)).toEqual(expected);
  });

  it('should make an edit action', () => {
    const expected = {
      type: EDIT,
      payload: { todo },
    };

    expect(duck.editTodo(todo)).toEqual(expected);
  });

  it('should make a delete action', () => {
    const expected = {
      type: DELETE,
      payload: { id: todo.id },
    };

    expect(duck.deleteTodo(todo.id)).toEqual(expected);
  });

  it('should make a reset action', () => {
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
    expect(phase).toBe(INIT);
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
      payload: {
        text,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle EDIT request', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: EDIT,
      payload: {
        todo,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle DELETE request', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: DELETE,
      payload: {
        todo,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(LOADING);
    expect(error).toBe(null);
  });

  it('should handle FETCH_SUCCESS', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: FETCH_SUCCESS,
      payload: {
        todos: todosMock,
      },
    });

    expect(todos.equals(todosMock)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle CREATE_SUCCESS', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: CREATE_SUCCESS,
      payload: {
        todo: new Todo(todo),
      },
    });

    const expectedTodos = new Map().set(todo.id, new Todo(todo));

    expect(todos.equals(expectedTodos)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle EDIT_SUCCESS', () => {
    const initialState = reducer({}).set('todos', todosMock);

    const { todos, phase, error } = reducer(initialState, {
      type: EDIT_SUCCESS,
      payload: {
        todo: new Todo(todoEdit),
      },
    });

    const expectedTodos = todosMock.set(todo.id, new Todo(todoEdit));

    expect(todos.equals(expectedTodos)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle DELETE_SUCCESS', () => {
    const initialState = reducer({}).set('todos', todosMock);

    const { todos, phase, error } = reducer(initialState, {
      type: DELETE_SUCCESS,
      payload: {
        id: todo.id,
      },
    });

    const expectedTodos = todosMock.delete(todo.id);

    expect(todos.equals(expectedTodos)).toBe(true);
    expect(phase).toBe(SUCCESS);
    expect(error).toBe(null);
  });

  it('should handle FETCH_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: FETCH_ERROR,
      payload: {
        error: errorMsg,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle CREATE_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: CREATE_ERROR,
      payload: {
        error: errorMsg,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle EDIT_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: EDIT_ERROR,
      payload: {
        error: errorMsg,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle DELETE_ERROR', () => {
    const { todos, phase, error } = reducer(undefined, {
      type: DELETE_ERROR,
      payload: {
        error: errorMsg,
      },
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(ERROR);
    expect(error).toBe(errorMsg);
  });

  it('should handle RESET', () => {
    const initialState = reducer({
      todos: todosMock.toJS(),
      payload: {
        phase: SUCCESS,
      },
    });

    const { todos, phase, error } = reducer(initialState, {
      type: RESET,
    });

    expect(todos.equals(new Map())).toBe(true);
    expect(phase).toBe(INIT);
    expect(error).toBe(null);
  });
});
