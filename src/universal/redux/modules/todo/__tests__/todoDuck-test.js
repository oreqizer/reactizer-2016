import * as actions from '../todoDuck';
import {
  FETCH,
  CREATE,
  EDIT,
  DELETE,
} from '../todoActions';

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
