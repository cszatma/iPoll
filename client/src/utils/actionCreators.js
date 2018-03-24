// @flow

import type { Course } from './types';

type AddCourseAction = { type: string, course: Course };

export const actionTypes = {
    addCourse: 'ADD_COURSE',
};

/* Action Functions */
function addCourse(course: Course): AddCourseAction {
    return {
        type: actionTypes.addCourse,
        course,
    };
}
/* End Action Functions */

// Exports

const actionCreators = {
    addCourse,
};

export type Action = AddCourseAction;
export default actionCreators;
