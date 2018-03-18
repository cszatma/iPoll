import React from 'react';
import { Container, Row } from 'reactstrap';
import { Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

const sidebarItems = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Courses', url: '/courses' },
    { name: 'Account', url: '/account' },
    { name: 'Logout', url: '/logout' },
];

const AppContainer = () => (
    <Container fluid>
        <Row>
            <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
            <Sidebar items={sidebarItems} />
            <Route path="/dashboard" component={Dashboard} />
            <p className="App-intro">iPoll</p>
        </Row>
    </Container>
);

export default AppContainer;
