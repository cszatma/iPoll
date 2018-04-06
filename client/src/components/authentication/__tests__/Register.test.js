import React from 'react';
import { shallow } from 'enzyme';

import Register from '../Register';

it('should render 4 inputs with the correct fields', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Register />);
    });
});
