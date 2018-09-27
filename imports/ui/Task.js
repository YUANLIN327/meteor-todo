import React, { Component } from 'react';
import {Tasks} from '../api/tasks';

// Task component - represents a single todo item
export default class Task extends Component {
    toggleCheck() {
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteTask() {
        Tasks.remove(this.props.task._id);
    }

    render() {
        const taskClassName = this.props.task.checked ? 'checked' : '';
        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteTask.bind(this)}>delete</button>
                <input
                    type="checkbox"
                    readOnly
                    checked={!!this.props.task.checked}
                    onClick={this.toggleCheck.bind(this)}
                />
                <span className="text">{this.props.task.text}</span>
            </li>
        );
    }
}