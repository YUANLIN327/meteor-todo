import React, { Component } from 'react';

export default class DetailTodo extends Component {
  componentDidMount() {
    console.log('props', this.props.match.params);
  }

  render() {
    const todoId = this.props.match.params.todoId;
    return (
      <div>
        This is Todo ID: {todoId}
      </div>
    );
  }
}
