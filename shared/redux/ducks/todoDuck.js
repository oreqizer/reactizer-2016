import { List } from 'immutable';

// README:
// a very simplified example. no failure actions
// no state checking like loading, etc...

export const FETCH = 'todo/FETCH';
export const FETCH_SUCCESS = 'todo/FETCH_SUCCESS';

export const CREATE = 'todo/CREATE';
export const CREATE_SUCCESS = 'todo/CREATE_SUCCESS';

export const EDIT = 'todo/EDIT';
export const DELETE = 'todo/DELETE';

const todoState = new List();

export default function todoReducer(state = todoState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return new List(action.todos);

    case CREATE_SUCCESS:
      return state.push(action.text);

    case EDIT:
      return state.set(action.id, action.text);

    case DELETE:
      return state.delete(action.id);

    default:
      return state;
  }
}

export function fetchTodos() {
  return {
    type: FETCH
  };
}

export function createTodo(text) {
  return {
    type: CREATE,
    text
  };
}

export function editTodo(id, text) {
  return {
    type: EDIT,
    id,
    text
  };
}

export function deleteTodo(id) {
  return {
    type: DELETE,
    id
  };
}
