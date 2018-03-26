// @flow

import type { Course } from './types';

type AddCourseAction = { type: 'ADD_COURSE', course: Course };
type SetCoursesAction = { type: 'SET_COURSES', courses: Course[] };

export const actionTypes = {
    addCourse: 'ADD_COURSE',
    setCourses: 'SET_COURSES',
};

/* Action Functions */
function addCourse(course: Course): AddCourseAction {
    return {
        type: actionTypes.addCourse,
        course,
    };
}

function setCourses(courses: Course[]): SetCoursesAction {
    return {
        type: actionTypes.setCourses,
        courses,
    };
}
/* End Action Functions */

// Exports

const actionCreators = {
    addCourse,
    setCourses,
};

export type Action = AddCourseAction | SetCoursesAction;
export default actionCreators;
