// @flow

import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

import type { RouteNavItem } from '../utils/types';

type Props = {
    navItem: RouteNavItem,
};

const RouteNavLink = ({ navItem }: Props) => (
    <NavItem>
        <NavLink
            tag={Link}
            to={navItem.url}
            activeClassName="active"
            className="btn-secondary"
        >
            {navItem.name}
        </NavLink>
    </NavItem>
);

export default RouteNavLink;
