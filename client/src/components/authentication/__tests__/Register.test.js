import React from 'react';
import { shallow } from 'enzyme';

import Register from '../Register';

describe('Register component tests', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Register />);
    });

    it('should render the Register component', () => {
        expect(wrapper).toHaveLength(1);
    });
});
