import React, { PropTypes } from 'react';
import { List, ListItem, Checkbox, IconButton, FontIcon } from 'material-ui';

const Todos = ({ todos, token, onEdit, onDelete }) =>
  <List>
    {todos.map(todo => (
      <ListItem
        key={todo.id}
        primaryText={todo.text}
        leftCheckbox={
          <Checkbox
            checked={todo.done}
            onCheck={(ev, checked) => onEdit({
              token,
              todo: todo.set('done', checked),
            })}
          />
        }
        rightIconButton={
          <IconButton onTouchTap={() => onDelete({ token, id: todo.id })}>
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        }
      />
    ))}
  </List>;

Todos.propTypes = {
  token: PropTypes.string.isRequired,
  todos: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todos;
