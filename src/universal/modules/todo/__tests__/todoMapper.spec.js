import { List } from 'immutable';

import Todo from '../../../containers/Todo';
import mapper from '../todoMapper';

const todoArray = [
  { id: 2, text: 'todo2' },
  { id: 1, text: 'todo1' },
  { id: 3, text: 'todo3' },
];

describe('todo mapper', () => {
  it('should return an empty List', () => {
    const mappedTodos = mapper([]);
    const expectedTodos = List();

    expect(expectedTodos.equals(mappedTodos)).toBe(true);
  });

  it('should map todo array to List', () => {
    const mappedTodos = mapper(todoArray);
    const expectedTodos = List([
      new Todo(todoArray[0]),
      new Todo(todoArray[1]),
      new Todo(todoArray[2]),
    ]);

    expect(expectedTodos.equals(mappedTodos)).toBe(true);
  });
});
