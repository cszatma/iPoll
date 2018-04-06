// @flow

import React, { Component } from 'react';
import { Input as RSInput } from 'reactstrap';

import type { InputType } from '../../utils/types';

type Props = {
    className?: string,
    type: InputType,
    value: string,
    placeholder?: string,
    validate?: string => ?string,
    onChange: (InputType, string, ?string) => void,
    invalid: boolean,
};

type State = {
    value: string,
    error: boolean,
};

export default class Input extends Component<Props, State> {
    static defaultProps = {
        value: '',
        invalid: false,
    };

    state = {
        value: this.props.value,
        error: this.props.invalid,
    };

    componentWillReceiveProps(newProps: Props) {
        this.setState({ value: newProps.value, error: newProps.invalid });
    }

    onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const error = this.props.validate ? this.props.validate(value) : null;

        this.setState({ value, error: !!error });
        this.props.onChange(this.props.type, value, error);
    };

    render() {
        return (
            <RSInput
                className={this.props.className}
                type={this.props.type.type}
                name={this.props.type.name}
                placeholder={this.props.placeholder}
                invalid={this.state.error}
                onChange={this.onChange}
                min={this.props.type.type === 'number' ? 1 : null}
            />
        );
    }
}
