import React, { PropTypes } from 'react';
import { List, ListItem, IconButton, FontIcon } from 'material-ui';
import { IndexedSeq } from 'immutable';


const TodosList = ({ todos, onEdit, onDelete }) => (
  <List>
    {todos.map(todo =>
      <ListItem
        key={todo.id}
        primaryText={todo.text}
        onTouchTap={() => onEdit(todo.set('done', !todo.done))}
        rightIconButton={
          <IconButton onTouchTap={() => onDelete(todo.id)}>
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        }
        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      />,
    )}
  </List>
);

TodosList.propTypes = {
  todos: PropTypes.instanceOf(IndexedSeq).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodosList;
