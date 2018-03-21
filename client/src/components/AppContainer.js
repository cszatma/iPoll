import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Courses from './courses/Courses';
import client from '../Client';

const sidebarItems = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Courses', url: '/courses' },
    { name: 'Account', url: '/account' },
    { name: 'Logout', url: '/logout' },
];

export default class AppContainer extends PureComponent<{}> {
    constructor(props: {}) {
        super(props);
        client.subscribe(isValid => !isValid && this.forceUpdate());
    }

   render() {
       if (!client.isLoggedIn()) {
           return <Redirect to="/login" />;
       }

       return (
           <Container fluid>
               <Row>
                   <Sidebar items={sidebarItems}/>
                   <Col md="9" className="mt-3">
                       <Route exact path="/" render={() => <Redirect to="/dashboard" />}/>
                       <Route path="/dashboard" component={Dashboard} />
                       <Route path="/courses" component={Courses} />
                   </Col>
               </Row>
           </Container>
       )
   }
}
