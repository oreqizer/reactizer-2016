import React, { Component, PropTypes } from 'react';
import { autobind } from 'core-decorators';

export default class TodosForm extends Component {
  static propTypes = {
    createTodo: PropTypes.func
  };

  @autobind
  handleSubmit() {
    const node = this.refs['todo-input'];

    this.props.createTodo(node.value);

    node.value = '';
  }

  render() {
    return (
      <div id="todo-form">
        <input type="text" placeholder="type todo" ref="todo-input" />
        <input type="submit" value="OK!" onClick={this.handleSubmit} />
      </div>
    );
  }
}
