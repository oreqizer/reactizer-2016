import React, { PropTypes, PureComponent } from 'react';
import { ListItem, IconButton, FontIcon } from 'material-ui';

import Todo from '../../../universal/containers/Todo';


const doneStyle = {
  textDecoration: 'line-through',
};

const notDoneStyle = {
  textDecoration: 'none',
};

export default class TodoItem extends PureComponent {
  static propTypes = {
    todo: PropTypes.instanceOf(Todo).isRequired,
    index: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleToggle() {
    const { todo, index, onEdit } = this.props;

    onEdit(todo.set('done', !todo.done), index);
  }

  handleDelete() {
    const { todo, index, onDelete } = this.props;

    onDelete(todo.id, index);
  }

  render() {
    const { todo, index } = this.props;

    return (
      <ListItem
        key={index}
        primaryText={todo.text}
        onTouchTap={this.handleToggle}
        rightIconButton={
          <IconButton onTouchTap={this.handleDelete}>
            <FontIcon className="material-icons">delete</FontIcon>
          </IconButton>
        }
        style={todo.done ? doneStyle : notDoneStyle}
      />
    );
  }
}
