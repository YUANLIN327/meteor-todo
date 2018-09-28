import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// route components
import AppContainer from '../../ui/App.js';

const browserHistory = createBrowserHistory();

export const renderRoutes = () => (
  <Router>
    <Route exact path="/" component={AppContainer}/>
  </Router>
);
