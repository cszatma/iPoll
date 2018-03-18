// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import '../styles/App.scss';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import PrivateRoute from './PrivateRoute';
import AppContainer from './AppContainer';

const App = () => (
    <div>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/" component={AppContainer} />
        </Switch>
    </div>
);

export default App;
