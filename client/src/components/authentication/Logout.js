// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import client from '../../Client';
import CubeLoader from '../CubeLoader';

type Props = {};

type State = {
    shouldRedirect: boolean,
};

export default class Logout extends Component<Props, State> {
    state = {
        shouldRedirect: false,
    };

    constructor(props: Props) {
        super(props);

        client
            .logout()
            .then(() => this.setState({ shouldRedirect: true }))
            .catch(error => {
                console.log(error);
                this.setState({ shouldRedirect: true });
            });
    }

    render() {
        return this.state.shouldRedirect ? (
            <Redirect to="/login" />
        ) : (
            <CubeLoader />
        );
    }
}
