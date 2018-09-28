import React, { Component } from 'react';

export default class DetailTodo extends Component {
  render() {
    const todoId = this.props.match.params.todoId;
    return (
      <div>
        This is Todo ID: {todoId}
      </div>
    );
  }
}
