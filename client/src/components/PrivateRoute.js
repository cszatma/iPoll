// @flow

import React from 'react';
import type { ComponentType } from 'react';
import { Route, Redirect } from 'react-router-dom';

import client from '../Client';

type Props = {
    component: ComponentType<any>,
};

const PrivateRoute = ({ component, ...rest }: Props) => (
    <Route
        {...rest}
        render={props =>
            client.isLoggedIn() ? (
                React.createElement(component, props)
            ) : (
                <Redirect
                    to={{ pathname: '/login', state: { from: props.location } }}
                />
            )
        }
    />
);

export default PrivateRoute;
