import { List } from 'immutable';

import Todo from '../../containers/Todo';

export default todos => List(todos).map(todo => new Todo(todo));
