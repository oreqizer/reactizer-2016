import { Record, Map, fromJS } from 'immutable';

import Todo from '../../../containers/Todo';
import { CLEAN, SUCCESS, LOADING, ERROR } from '../../../consts/stateConsts';

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
} from './todoActions';

const InitialState = new Record({
  todos: new Map(),
  phase: CLEAN,
  error: null,
});

function toInitialState(state) {
  const newState = new InitialState(fromJS(state));
  const todos = newState.todos.map(todo => new Todo(todo));

  return newState.set('todos', todos);
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
    case EDIT_SUCCESS:
      return state
        .setIn(['todos', action.todo.id], action.todo)
        .set('phase', SUCCESS);

    case DELETE_SUCCESS:
      return state
        .deleteIn(['todos', action.todo.id])
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
