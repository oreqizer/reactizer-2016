import { Map } from 'immutable';

import Todo from '../../../containers/Todo';
import * as mappers from '../todoMapper';

jest.unmock('ramda');
jest.unmock('immutable');
jest.unmock('../todoMapper');
jest.unmock('../../../containers/Todo');

// sorted: 1, 0, 2
const todoArray = [
  { id: 2, text: 'todo2' },
  { id: 1, text: 'todo1' },
  { id: 3, text: 'todo3' },
];

describe('todo mappers', () => {
  it('should map todo array to Map', () => {
    const mappedTodos = mappers.toMap(todoArray);
    const expectedTodos = new Map()
      .set(1, new Todo(todoArray[1]))
      .set(2, new Todo(todoArray[0]))
      .set(3, new Todo(todoArray[2]));

    expect(expectedTodos.equals(mappedTodos)).toBe(true);
  });
});
