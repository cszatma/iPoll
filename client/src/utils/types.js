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
    value: string,
};

type InputData = {
    name: string,
    value: string,
};

type ValidationResult = {
    isValid: boolean,
    errors: InputError[],
};

type Token = {
    id: string,
    token: string,
    userID: number,
};

type Course = {
    id: number,
    courseCode: string,
    title: string,
    description: string,
    teacherID: number,
    school: string,
};

type CourseType = 'enrolled' | 'owned';

export type {
    RouteNavItem,
    RESTMethod,
    InputType,
    InputError,
    FormInputObject,
    InputData,
    ValidationResult,
    Token,
    Course,
    CourseType,
};
