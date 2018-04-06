// @flow

import React, { PureComponent } from 'react';
import { Container, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import Form from '../common/Form';
import CubeLoader from '../common/CubeLoader';
import type { InputData } from '../../utils/types';
import client from '../../Client';

type State = {
    creationInProgress: boolean,
    shouldRedirect: boolean,
    creationError: boolean,
};

const inputs = [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'course-code', type: 'text' },
];

export default class CreateCourse extends PureComponent<{}, State> {
    state = {
        creationInProgress: false,
        shouldRedirect: false,
        creationError: false,
    };

    handleFormSubmit = ([title, description, courseCode]: InputData[]) => {
        this.setState({ creationInProgress: true });

        if (
            title.name !== 'title' ||
            description.name !== 'description' ||
            courseCode.name !== 'course-code'
        ) {
            this.setState({ creationInProgress: false, creationError: true });
            throw Error('Title or Description or Course Code missing!');
        }

        client
            .createCourse(title.value, description.value, courseCode.value)
            .then(json => {
                console.log(json);
                this.setState({ shouldRedirect: true });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    creationInProgress: false,
                    creationError: true,
                });
            });
    };

    render() {
        if (this.state.shouldRedirect) {
            return <Redirect to="/courses" />;
        }

        const content = this.state.creationInProgress ? (
            <div className="pt-5">
                <CubeLoader />
            </div>
        ) : (
            <Form
                inputs={inputs}
                onSubmit={this.handleFormSubmit}
                submitText="Create Course"
            />
        );

        return (
            <Container>
                {this.state.creationError ? (
                    <Alert color="danger">
                        Unable to create course. Please try again.
                    </Alert>
                ) : null}
                <h1>Create a new course</h1>
                {content}
            </Container>
        );
    }
}
