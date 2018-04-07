import React from 'react';
import { shallow } from 'enzyme';

import Input from '../Input';

describe('Input component __tests__', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <Input
                type="text"
                value=""
                invalid={false}
                validate={value => value === '' ? 'Value missing' : null}
                onChange={() => null}
            />,
        );
    });

    it('should render the input component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('should have initial value of empty string', () => {
        expect(wrapper.prop('value')).toEqual('');
    });

    it('should have prop invalid be false', () => {
        expect(wrapper.prop('invalid')).toEqual(false);
    });

    describe('test change events', () => {
        it('should update the state', () => {
            wrapper.simulate('change', { target: { value: 'Chris' } });
            expect(wrapper.state('value')).toEqual('Chris');
        });

        it('should have state.error set to true', () => {
            wrapper.simulate('change', { target: { value: '' } });
            expect(wrapper.state('error')).toBe(true);
        });

        it('should be invalid', () => {
            wrapper.simulate('change', { target: { value: '' } });
            expect(wrapper.prop('invalid')).toBe(true);
        });
    });
});
