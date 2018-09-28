import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DetailTodo from './DetailTodo.js';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      hideCompleted: false,
    }
  }

  renderTasks() {
    const userId = Meteor.userId();
    return this.props.tasks.filter(task => this.state.hideCompleted ? !task.checked : true).map((task) => (
      <Task key={task._id} task={task} isOwner={userId === task.owner}/>
    ));
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const text = this.inputRef.current.value.trim();
    Meteor.call('tasks.insert', text);
    this.inputRef.current.value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted
    });
  }

  render() {
    const incompleteCount = this.props.incompleteCount;
    return (
      <Router>
        <div className="container">
          <header>
            <h1>Todo List: {incompleteCount}</h1>
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Tasks
            </label>
            <AccountsUIWrapper/>
            {this.props.currentUser ? <form onSubmit={this.handleFormSubmit.bind(this)}>
              <input type="text" ref={this.inputRef} placeholder="add some todo"></input>
            </form> : ''}
          </header>

          {this.props.currentUser && <ul>
            {this.renderTasks()}
          </ul>}

          <Route path={`/todo/:todoId`} component={DetailTodo}/>
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, { sort: { createAt: -1 } }).fetch() || [],
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count() || 0,
    currentUser: Meteor.user(),
  }
})(App)
