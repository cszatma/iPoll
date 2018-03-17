// @flow

import React from 'react';
import { Col, Nav } from 'reactstrap';

import RouteNavLink from './RouteNavLink';
import type { RouteNavItem } from '../types';

type Props = {
    items: RouteNavItem[],
};


const Sidebar = ({ items }: Props) => (
    <Col md="3" className="mt-4">
        <Nav className="flex-column">
            {
                items.map((item, i) => (
                    <RouteNavLink navItem={item} key={i} />
                ))
            }
        </Nav>
    </Col>
);

export default Sidebar;