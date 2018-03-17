// @flow

import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router';

import type { RouteNavItem } from '../types';

type Props = {
    navItem: RouteNavItem,
};

const RouteNavLink = ({ navItem }: Props) => (
    <NavItem>
        <NavLink tag={Link} to={navItem.url} activeClassName="active">
            {navItem.name}
        </NavLink>
    </NavItem>
);

export default RouteNavLink;