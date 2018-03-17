// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import client from '../Client';
import Form from './Form';
import CubeLoader from './CubeLoader';
import type { InputData } from '../types';
import type { NavLink } from 'react-router-dom';

type Props = {
    location: NavLink.location,
};

type State = {
    loginInProgress: boolean,
    shouldRedirect: boolean,
};

export default class Login extends Component<Props, State> {
    state = {
        loginInProgress: false,
        shouldRedirect: false,
    };

    performLogin = ([username, password]: InputData[]) => {
        this.setState({ loginInProgress: true });

        if (username.name !== 'username' || password.name !== 'password') {
            throw Error('Username or Password missing!');
        }

        client.login(username.value, password.value)
            .then(() => this.setState({ shouldRedirect: true }))
            .catch(error => console.log(error));
        // TODO add proper error handling
    };

    redirectPath = () => {
        const locationState = this.props.location.state;
        const pathname = locationState && locationState.from && locationState.from.pathname;
        return pathname || '/dashboard';
    };

    render() {
        const inputs = [
            { name: 'username', type: 'text' },
            { name: 'password', type: 'password' },
        ];

        if (this.state.shouldRedirect) {
            return <Redirect to={this.redirectPath()}/>;
        }

        return (
            <Container>
                {
                    this.state.loginInProgress ?
                        <CubeLoader /> :
                        <Form
                            inputs={inputs}
                            onSubmit={this.performLogin}
                            submitText="Login"
                        />
                }
            </Container>
        );
    }
}