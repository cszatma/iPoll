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

export type { RouteNavItem, RESTMethod, InputType, InputError };