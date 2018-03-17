// @flow

import React from 'react';
import { Route } from 'react-router-dom';

import '../styles/App.scss';
import Login from './Login';
import Logout from './Logout';
import PrivateRoute from './PrivateRoute';
import AppContainer from './AppContainer';

const App = () => (
    <div>
        <PrivateRoute exact path="/" component={AppContainer} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
    </div>
);

export default App;
