// @flow

import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Alert, Col, Container, Row } from 'reactstrap';

import client from '../../Client';
import Form from '../common/Form';
import CubeLoader from '../common/CubeLoader';
import type {
    InputData,
    FormInputObject,
    ValidationResult,
} from '../../utils/types';

type State = {
    registerInProgress: boolean,
    shouldRedirect: boolean,
    registerError: boolean,
};

export default class Register extends Component<{}, State> {
    state = {
        registerInProgress: false,
        shouldRedirect: client.isLoggedIn(),
        registerError: false,
    };

    performRegister = ([username, school, password]: InputData[]) => {
        this.setState({ registerInProgress: true, registerError: false });

        if (
            username.name !== 'username' ||
            school.name !== 'school' ||
            password.name !== 'password'
        ) {
            this.setState({ registerInProgress: false, registerError: true });
            throw Error('Username, Student Number or Password missing!');
        }

        client
            .register(username.value, school.value, password.value)
            .then(() => this.setState({ shouldRedirect: true }))
            .catch(error => {
                console.log(error);
                this.setState({
                    registerInProgress: false,
                    registerError: true,
                });
            });
    };

    render() {
        const inputs = [
            { name: 'username', type: 'text' },
            { name: 'school', type: 'text' },
            { name: 'password', type: 'password' },
            { name: 'confirm-password', type: 'password' },
        ];

        if (this.state.shouldRedirect) {
            return <Redirect to="/dashboard" />;
        }

        const customValidation = (
            inputs: FormInputObject[],
        ): ValidationResult => {
            const [passwordInput, confirmPasswordInput] = inputs.filter(input =>
                input.type.name.includes('password'),
            );

            if (passwordInput.value === confirmPasswordInput.value) {
                return { isValid: true, errors: [] };
            }

            return {
                isValid: false,
                errors: [
                    {
                        input: confirmPasswordInput.type,
                        error: 'Passwords do not match.',
                    },
                ],
            };
        };

        const content = this.state.registerInProgress ? (
            <div className="pt-5">
                <CubeLoader />
            </div>
        ) : (
            <Col md="10">
                <h1>Register</h1>
                <Form
                    inputs={inputs}
                    onSubmit={this.performRegister}
                    submitText="Register"
                    className="my-3"
                    customValidation={customValidation}
                />
                <h5 className="pt-3">
                    Already have an account?&nbsp;
                    <span className="d-block d-md-inline">
                        Click <Link to="/login">here</Link> to log in.
                    </span>
                </h5>
            </Col>
        );

        return (
            <Container className="my-3">
                <Row className="justify-content-center">
                    {this.state.registerError ? (
                        <Alert color="danger">
                            Unable to register. Please try again.
                        </Alert>
                    ) : null}
                    {content}
                </Row>
            </Container>
        );
    }
}
