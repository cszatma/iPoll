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

type InputData = {
    name: string,
    value: string,
};

export type {
    RouteNavItem,
    RESTMethod,
    InputType,
    InputError,
    InputData,
};