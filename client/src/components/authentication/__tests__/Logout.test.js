import React from 'react';
import { shallow } from 'enzyme';

import Logout from '../Logout';

describe('Logout component tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Logout />);
    });

    it('should render the Logout component', () => {
        expect(wrapper).toHaveLength(1);
    });
});
