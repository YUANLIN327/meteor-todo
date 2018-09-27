import React from 'react';
import { Router, Route, Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import AppContainer from '../../ui/App.js';
import DetailTodo from '../../ui/DetailTodo.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" component={AppContainer} />
            <Route path="/todo/:todoId" component={DetailTodo} />
        </Switch>
    </Router>
);