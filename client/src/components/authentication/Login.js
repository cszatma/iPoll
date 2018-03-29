// @flow

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Col, Container, Alert, Row } from 'reactstrap';

import client from '../../Client';
import Form from '../Form';
import CubeLoader from '../CubeLoader';
import type { InputData } from '../../utils/types';

type Props = {
    location: Link.location,
};

type State = {
    loginInProgress: boolean,
    shouldRedirect: boolean,
    loginError: boolean,
};

export default class Login extends Component<Props, State> {
    state = {
        loginInProgress: false,
        shouldRedirect: client.isLoggedIn(),
        loginError: false,
    };

    performLogin = ([username, password]: InputData[]) => {
        this.setState({ loginInProgress: true, loginError: false });

        if (username.name !== 'username' || password.name !== 'password') {
            this.setState({ loginInProgress: false, loginError: true });
            throw Error('Username or Password missing!');
        }

        client
            .login(username.value, password.value)
            .then(() => this.setState({ shouldRedirect: true }))
            .catch(error => {
                console.log(error);
                this.setState({ loginInProgress: false, loginError: true });
            });
    };

    redirectPath = () => {
        const locationState = this.props.location.state;
        const pathname =
            locationState && locationState.from && locationState.from.pathname;
        return pathname || '/dashboard';
    };

    render() {
        const inputs = [
            { name: 'username', type: 'text' },
            { name: 'password', type: 'password' },
        ];

        if (this.state.shouldRedirect) {
            return <Redirect to={this.redirectPath()} />;
        }

        const content = this.state.loginInProgress ? (
            <div className="pt-5">
                <CubeLoader />
            </div>
        ) : (
            <Col md="10">
                <h1>Login</h1>
                <Form
                    inputs={inputs}
                    onSubmit={this.performLogin}
                    submitText="Login"
                    className="my-3"
                />
                <h5 className="pt-3">
                    Don't have an account?&nbsp;
                    <span className="d-block d-md-inline">
                        Click <Link to="/register">here</Link> to register.
                    </span>
                </h5>
            </Col>
        );

        return (
            <Container className="my-3">
                <Row className="justify-content-center">
                    {this.state.loginError ? (
                        <Alert color="danger">
                            Unable to login. The username or password given is
                            incorrect.
                        </Alert>
                    ) : null}
                    {content}
                </Row>
            </Container>
        );
    }
}
