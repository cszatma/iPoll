// @flow

type RouteNavItem = {
    name: string,
    url: string,
};

type RESTMethod = 'get' | 'post' | 'put' | 'options' | 'delete' | 'patch';

type InputType = {
    +name: string,
    +type: string,
};

type InputError = {
    input: InputType,
    error: ?string,
};

type FormInputObject = {
    +type: InputType,
    value: string
};

type InputData = {
    name: string,
    value: string,
};

type ValidationResult = {
    isValid: boolean,
    errors: InputError[],
};

export type {
    RouteNavItem,
    RESTMethod,
    InputType,
    InputError,
    FormInputObject,
    InputData,
    ValidationResult,
};