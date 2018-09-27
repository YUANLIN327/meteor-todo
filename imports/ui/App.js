import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';

// App component - represents the whole app
class App extends Component {

    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
        this.state = {
            hideCompleted: false,
        }
    }

    renderTasks() {
        return this.props.tasks.filter(task => this.state.hideCompleted ? !task.checked : true).map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const text = this.inputRef.current.value.trim();
        Tasks.insert({ 
             text,
             createAt: Date.now()
             });
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
                    <AccountsUIWrapper />
                    <form onSubmit={this.handleFormSubmit.bind(this)}>
                        <input type="text" ref={this.inputRef} placeholder="add some todo"></input>
                    </form>
                </header>

                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        tasks: Tasks.find({}, { sort: { createAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    }
})(App)