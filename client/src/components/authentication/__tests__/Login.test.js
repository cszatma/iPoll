import React from 'react';
import { shallow } from 'enzyme';

import Login from '../Login';

describe('Login tests', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Login />);
    });
    
    it('should render the component', () => {
        expect(wrapper).toHaveLength(1);
    });
});

