import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import Task from './Task.js';

// App component - represents the whole app
class App extends Component {

    constructor(props) {
        super(props)
        this.inputRef = React.createRef();
    }

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    handleFormSubmit(event) {
        event.preventDefault();
        const text = this.inputRef.current.value.trim();
        Tasks.insert({ text, createAt: Date.now() });
        this.inputRef.current.value = '';
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
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
    }
})(App)