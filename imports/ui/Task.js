import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import '../styles/task.scss';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleCheck() {
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.markPrivate', this.props.task._id, !this.props.task.isPrivate);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';
    return (
      <Link to={`/todo/${this.props.task._id}`}>
        <li className={taskClassName}>
          <button className="delete" onClick={this.deleteTask.bind(this)}>delete</button>
          <input
            type="checkbox"
            readOnly
            checked={!!this.props.task.checked}
            onClick={this.toggleCheck.bind(this)}
          />
          {this.props.isOwner ? (
            <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
              {this.props.task.isPrivate ? 'Private' : 'Public'}
            </button>
          ) : ''}
          <span className="text">
                    <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>
        </li>
      </Link>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object,
  isOwner: PropTypes.bool,
};
