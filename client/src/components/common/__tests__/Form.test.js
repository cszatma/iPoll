import React from 'react';
import { shallow } from 'enzyme';

import Form from '../Form';

describe('Form component sests', () => {
    let wrapper;

    beforeEach(() => {
        const inputs = [
            { name: 'username', type: 'text' },
            { name: 'password', type: 'password' },
        ];

        wrapper = shallow(<Form inputs={inputs} submitText="Submit" />);
    });

    it('should have 2 inputs', () => {
        expect(wrapper.find('Input').length).toBe(2);
    });

    describe('input tests', () => {
        let username, password;

        beforeEach(() => {
            [username, password] = wrapper.find('Input');
        });

        it('should have a username field', () => {
            expect(username.props.type).toEqual({
                name: 'username',
                type: 'text',
            });
        });

        it('should have a password field', () => {
            expect(password.props.type).toEqual({
                name: 'password',
                type: 'password',
            });
        });
    });

    describe('test the submit button', () => {
        let button;

        beforeEach(() => {
            button = wrapper.find('Button').first();
        });

        it('should have a Button component', () => {
            expect(button).toBeTruthy();
        });

        it('should have text `Submit`', () => {
            expect(button.prop('children')).toBe('Submit');
        });
    });
});
