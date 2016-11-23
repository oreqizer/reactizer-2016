import { combineEpics } from 'redux-observable';
import { change } from 'redux-form';
import { Record, List } from 'immutable';

import * as api from './todoApi';

import { TODO } from '../../consts/formConsts';
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
  todos: List(),
  phase: INIT,
  error: null,
});

function toInitialState(state) {
  return new InitialState({
    ...state,
    todos: List(state.todos),
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
        .update('todos', todos => todos.push(action.payload.todo))
        .set('phase', SUCCESS);

    case EDIT_SUCCESS:
      return state
        .setIn(['todos', action.payload.index], action.payload.todo)
        .set('phase', SUCCESS);

    case DELETE_SUCCESS:
      return state
        .deleteIn(['todos', action.payload.index])
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

export const fetchTodos = () => ({
  type: FETCH,
});

export const createTodo = text => ({
  type: CREATE,
  payload: { text },
});

export const editTodo = (todo, index) => ({
  type: EDIT,
  payload: { todo, index },
});

export const deleteTodo = (id, index) => ({
  type: DELETE,
  payload: { id, index },
});

export const resetTodos = () => ({
  type: RESET,
});

const fetchTodosEpic = action$ =>
  action$.ofType(FETCH)
    .mergeMap(api.fetchTodos)
    .map(todos => ({
      type: FETCH_SUCCESS,
      payload: { todos },
    }));

const createTodoEpic = (action$, store) =>
  action$.ofType(CREATE)
    .mergeMap(action => api.createTodo(action.payload.text))
    .do(() => store.dispatch(change(TODO, 'todo', '')))
    .map(todo => ({
      type: CREATE_SUCCESS,
      payload: { todo },
    }));

const editTodoEpic = action$ =>
  action$.ofType(EDIT)
    .mergeMap(action => api.editTodo(action.payload.todo), (src, res) => ({
      todo: res,
      index: src.payload.index,
    }))
    .map(payload => ({
      type: EDIT_SUCCESS,
      payload,
    }));

const deleteTodoEpic = action$ =>
  action$.ofType(DELETE)
    .mergeMap(action => api.deleteTodo(action.payload.id), (src, res) => ({
      id: res,
      index: src.payload.index,
    }))
    .map(payload => ({
      type: DELETE_SUCCESS,
      payload,
    }));

export const todoEpic = combineEpics(
  fetchTodosEpic,
  createTodoEpic,
  editTodoEpic,
  deleteTodoEpic,
);
