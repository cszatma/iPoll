// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import client from '../Client';

type Props = {};

export default class Logout extends Component<Props> {
    constructor(props: Props) {
        super(props);
        client.logout();
    }

    render() {
        return <Redirect to="/login" />;
    }
}
