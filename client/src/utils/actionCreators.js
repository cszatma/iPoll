// @flow

import type { Course, CourseType } from './types';

type AddCourseAction = {
    type: 'ADD_COURSE',
    course: Course,
    courseType: CourseType,
};
type SetCoursesAction = {
    type: 'SET_COURSES',
    courses: Course[],
    courseType: CourseType,
};

export const actionTypes = {
    addCourse: 'ADD_COURSE',
    setCourses: 'SET_COURSES',
};

/* Action Functions */
function addCourse(course: Course, courseType: CourseType): AddCourseAction {
    return {
        type: actionTypes.addCourse,
        course,
        courseType,
    };
}

function setCourses(courses: Course[], courseType: CourseType): SetCoursesAction {
    return {
        type: actionTypes.setCourses,
        courses,
        courseType,
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
