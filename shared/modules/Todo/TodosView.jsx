import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

@autobind
export default class TodosView extends Component {
  static propTypes = {
    todos: PropTypes.object,
    deleteTodo: PropTypes.func,
    editTodo: PropTypes.func
  };

  handleDelete(e) {
    const id = Number(e.target.dataset.id);

    // Equivalent to `dispatch(deleteTodo())`
    this.props.deleteTodo(id);
  }

  handleEdit(e) {
    const id = Number(e.target.dataset.id);
    const val = this.props.todos.get(id).text;

    // For cutting edge UX
    // TODO mind: this ain't client
    const newVal = window.prompt('', val); // eslint-disable-line
    this.props.editTodo(id, newVal);
  }

  render() {
    const { todos } = this.props;

    return (
      <div id="todo-list">
        {todos.map((todo, index) =>
          <div key={index}>
            <span>{todo}</span>

            <button data-id={index} onClick={this.handleDelete}>
              X
            </button>
            <button data-id={index} onClick={this.handleEdit}>
              Edit
            </button>
          </div>
        )}
      </div>
    );
  }
}
