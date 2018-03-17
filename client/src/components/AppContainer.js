import React from 'react';
import { Container, Row } from 'reactstrap';

import Sidebar from './Sidebar';

const sidebarItems = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Courses', url: '/courses' },
    { name: 'Account', url: '/account' },
    { name: 'Logout', url: '/logout' },
];

const AppContainer = () => (
    <Container fluid>
        <Row>
            <Sidebar items={sidebarItems} />
            <p className="App-intro">iPoll</p>
        </Row>
    </Container>
);

export default AppContainer;
