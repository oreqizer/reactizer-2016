import { Record, Map } from 'immutable';
import { values } from 'ramda';

import toMap from './todoMapper';
import Todo from '../../containers/Todo';
import { INIT, SUCCESS, LOADING, ERROR } from '../../consts/phaseConsts';

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
  todos: new Map(),
  phase: INIT,
  error: null,
});

function toInitialState(state) {
  return new InitialState({
    ...state,
    todos: toMap(values(state.todos)),
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
        .set('todos', action.payload.todos)
        .set('phase', SUCCESS);

    case CREATE_SUCCESS:
      return state
        .setIn(['todos', action.payload.todo.id], new Todo(action.payload.todo))
        .set('phase', SUCCESS);

    case EDIT_SUCCESS:
      return state
        .setIn(['todos', action.payload.todo.id], new Todo(action.payload.todo))
        .set('phase', SUCCESS);

    case DELETE_SUCCESS:
      return state
        .deleteIn(['todos', action.payload.id])
        .set('phase', SUCCESS);

    case FETCH_ERROR:
    case CREATE_ERROR:
    case EDIT_ERROR:
    case DELETE_ERROR:
      return state
        .set('phase', ERROR)
        .set('error', String(action.payload.error));

    case RESET:
      return new InitialState();

    default:
      return state;
  }
}

export const fetchTodos = ({ token }) => ({
  type: FETCH,
  payload: { token },
});

export const createTodo = ({ token, text }) => ({
  type: CREATE,
  payload: { token, text },
});

export const editTodo = ({ token, todo }) => ({
  type: EDIT,
  payload: { token, todo },
});

export const deleteTodo = ({ token, id }) => ({
  type: DELETE,
  payload: { token, id },
});

export const resetTodos = () => ({
  type: RESET,
});
