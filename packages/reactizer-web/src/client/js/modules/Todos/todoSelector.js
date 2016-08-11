import { createSelector } from 'reselect';

import { ALL, ACTIVE, DONE } from '../../../../../packages/reactizer-core/src/consts/todoConsts';

const todoSelector = ({ state }) => state.todo.todos.valueSeq();
const filterSelector = ({ props }) => props.params.filter;

export default createSelector(
  [todoSelector, filterSelector],
  (todos, filter = ALL) => {
    switch (filter) {
      case ALL:
        return todos;

      case ACTIVE:
        return todos.filter(todo => !todo.done);

      case DONE:
        return todos.filter(todo => todo.done);

      default:
        return todos;
    }
  }
);
