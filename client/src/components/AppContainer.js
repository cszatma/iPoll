import React, { PureComponent } from 'react';
import { Container, Row } from 'reactstrap';
import { Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
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
                   <Route exact path="/" render={() => <Redirect to="/dashboard"/>}/>
                   <Sidebar items={sidebarItems}/>
                   <Route path="/dashboard" component={Dashboard}/>
                   <p className="App-intro">iPoll</p>
               </Row>
           </Container>
       )
   }
}
