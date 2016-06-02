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
              oldTodo: todo,
              newTodo: todo.set('done', checked),
            })}
          />
        }
        rightIconButton={
          <IconButton onTouchTapp={() => onDelete({ token, todo })}>
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
