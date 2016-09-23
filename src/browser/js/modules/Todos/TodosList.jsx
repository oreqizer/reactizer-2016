import React, { PropTypes } from 'react';
import { List, ListItem, IconButton, FontIcon } from 'material-ui';
import { Map } from 'immutable';

const TodosList = ({ todos, token, onEdit, onDelete }) =>
  <List>
    {todos.map(todo =>
      <ListItem
        key={todo.id}
        primaryText={todo.text}
        onTouchTap={() => onEdit({
          token,
          todo: todo.set('done', !todo.done),
        })}
        rightIconButton={
          <IconButton onTouchTap={() => onDelete({ token, id: todo.id })}>
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        }
        style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      />
    )}
  </List>;

TodosList.propTypes = {
  token: PropTypes.string.isRequired,
  todos: PropTypes.instanceOf(Map).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodosList;
