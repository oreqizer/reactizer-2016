import React, { PropTypes } from 'react';
import { List, ListItem, IconButton, FontIcon } from 'material-ui';
import * as I from 'immutable';


const TodosList = ({ todos, onEdit, onDelete }) => (
  <List>
    {todos.map((todo, index) =>
      <ListItem
        key={index}
        primaryText={todo.text}
        onTouchTap={() => onEdit(todo.set('done', !todo.done), index)}
        rightIconButton={
          <IconButton onTouchTap={() => onDelete(todo.id, index)}>
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        }
        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      />,
    )}
  </List>
);

TodosList.propTypes = {
  todos: PropTypes.instanceOf(I.List).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodosList;
