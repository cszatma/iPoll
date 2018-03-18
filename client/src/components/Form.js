// @flow

import React, { Component } from 'react';
import { Button, Form as RSForm, FormGroup, FormFeedback, Label } from 'reactstrap';

import type { InputType, InputError, FormInputObject, InputData, ValidationResult } from '../types';
import Input from './Input';
import { removeAndCapitalizeAll } from '../utils';

type Props = {
    inputs: InputType[],
    onSubmit: InputData[] => void,
    submitText: string,
    className?: string,
    customValidation?: FormInputObject[] => ValidationResult,
};

type State = {
    inputs: FormInputObject[],
    inputErrors: InputError[],
};

export default class Form extends Component<Props, State> {
    state = {
        inputs: this.props.inputs.map(input => ({ type: input, value: '' })),
        inputErrors: this.props.inputs.map(input => ({ input, error: null })),
    };

    onInputChange = (inputType: InputType, value: string, error: ?string) => {
        const inputs = this.state.inputs;
        const inputErrors = this.state.inputErrors;

        const index = inputs.findIndex(input => input.type === inputType);

        if (index === -1) {
            throw Error('Input does not exist!');
        }

        this.setState({
            inputs: [
                ...inputs.slice(0, index),
                { type: inputType, value },
                ...inputs.slice(index + 1)
            ],
            inputErrors: [
                ...inputErrors.slice(0, index),
                { input: inputType, error },
                ...inputErrors.slice(index + 1),
            ],
        });
    };

    handleFormSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();

        const inputs = this.state.inputs;

        // Check if any inputs are missing
        const missingInputs = inputs.map(input => !input.value);

        const customValidation = this.props.customValidation;
        const customValidationErrors = customValidation && customValidation(inputs);

        if (missingInputs.some(val => val)) {
            // Create a new array of errors and update the state
            const newErrors = this.state.inputErrors.map((error, i) =>
                missingInputs[i] ? {
                    input: error.input,
                    error: inputErrorMessage(error.input.name)
            } : error);

            this.setState({ inputErrors: newErrors });
            return;
        } else if (customValidationErrors && !customValidationErrors.isValid) {
            const errors = customValidationErrors.errors;
            const newErrors = this.state.inputErrors.map(inputError => {
                const index = errors.findIndex(error => error.input === inputError.input);
                return index !== -1 ? errors[index] : inputError;
            });

            this.setState({ inputErrors: newErrors });
            return;
        }

        const data = inputs.map(input => ({ name: input.type.name, value: input.value }));
        this.props.onSubmit(data);
    };

    render() {
        const inputs = this.state.inputs.map((input, i) => {
            const name = input.type.name;
            const error = this.state.inputErrors[i].error;

            return (
                <FormGroup key={i}>
                    <Label for={name}>{removeAndCapitalizeAll(name)}</Label>
                    <Input
                        type={input.type}
                        value={input.value}
                        validate={value => value.trim() ? null : inputErrorMessage(name)}
                        onChange={this.onInputChange}
                        invalid={!!error}
                    />
                    {error ? <FormFeedback>{error}</FormFeedback> : null}
                </FormGroup>
            );
        });

        return (
            <RSForm onSubmit={this.handleFormSubmit} className={this.props.className}>
                {inputs}
                <Button>{this.props.submitText}</Button>
            </RSForm>
        );
    }
}

function inputErrorMessage(name: string): string {
    return `${removeAndCapitalizeAll(name)} required.`;
}
