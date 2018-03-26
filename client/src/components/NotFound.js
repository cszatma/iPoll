// @flow

import React from 'react';
import { Container, Jumbotron } from 'reactstrap';

const NotFound = () => (
    <Container>
        <Jumbotron>
            <h1>404 - Not Found</h1>
            <p>The page you have requested does not exist.</p>
        </Jumbotron>
    </Container>
);

export default NotFound;
