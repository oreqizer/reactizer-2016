import { Record, Set } from 'immutable';

import Todo from '../../../containers/Todo';
import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../consts/phaseConsts';

export const FETCH = 'todo/FETCH';
export const FETCH_SUCCESS = 'todo/FETCH_SUCCESS';
export const FETCH_ERROR = 'todo/FETCH_ERROR';

export const CREATE = 'todo/CREATE';
export const CREATE_SUCCESS = 'todo/CREATE_SUCCESS';
export const CREATE_ERROR = 'todo/CREATE_ERROR';

export const EDIT = 'todo/EDIT';
export const EDIT_SUCCESS = 'todo/EDIT_SUCCESS';
export const EDIT_ERROR = 'todo/EDIT_ERROR';

export const DELETE = 'todo/DELETE';
export const DELETE_SUCCESS = 'todo/DELETE_SUCCESS';
export const DELETE_ERROR = 'todo/DELETE_ERROR';

export const RESET = 'todo/RESET';

const InitialState = new Record({
  todos: new Set(),
  phase: CLEAN,
  error: null,
});

function toInitialState(state) {
  return new InitialState({
    ...state,
    todos: new Set(state.todos.map(todo => new Todo(todo))),
  });
}

export default function todoReducer(state = new InitialState(), action) {
  if (!(state instanceof InitialState)) return toInitialState(state);

  switch (action.type) {
    case FETCH:
    case CREATE:
    case EDIT:
    case DELETE:
      return state
        .set('phase', LOADING);

    case FETCH_SUCCESS:
      return state
        .set('todos', action.todos)
        .set('phase', SUCCESS);

    case CREATE_SUCCESS:
      return state
        .update('todos', todos => todos.add(action.todo))
        .set('phase', SUCCESS);

    case EDIT_SUCCESS:
      return state
        .set('phase', SUCCESS)
        .update('todos', todos => todos
          .delete(action.oldTodo)
          .add(action.newTodo));

    case DELETE_SUCCESS:
      return state
        .update('todos', todos => todos.delete(action.todo))
        .set('phase', SUCCESS);

    case FETCH_ERROR:
    case CREATE_ERROR:
    case EDIT_ERROR:
    case DELETE_ERROR:
      return state
        .set('phase', ERROR)
        .set('error', action.error);

    case RESET:
      return new InitialState();

    default:
      return state;
  }
}

export function fetchTodos() {
  return {
    type: FETCH,
  };
}

export function createTodo(text) {
  return {
    type: CREATE,
    text,
  };
}

export function editTodo(todo) {
  return {
    type: EDIT,
    todo,
  };
}

export function deleteTodo(todo) {
  return {
    type: DELETE,
    todo,
  };
}

export function resetTodos() {
  return {
    type: RESET,
  };
}
