// @flow

import { actionTypes } from '../utils/actionCreators';
import type { Action } from '../utils/actionCreators';
import type { Course } from '../utils/types';

type State = {
    ownedCourses: Course[],
    enrolledCourses: Course[],
};

export default function coursesReducer(
    state: State = { ownedCourses: [], enrolledCourses: [] },
    action: Action,
): State {
    if (action.type === actionTypes.addCourse) {
        if (action.courseType === 'owned') {
            return {
                ...state,
                ownedCourses: [...state.ownedCourses, action.course],
            };
        } else if (action.courseType === 'enrolled') {
            return {
                ...state,
                enrolledCourses: [...state.enrolledCourses, action.course],
            };
        } else {
            return state;
        }
    } else if (action.type === actionTypes.setCourses) {
        if (action.courseType === 'owned') {
            return {
                ...state,
                ownedCourses: action.courses,
            };
        } else if (action.courseType === 'enrolled') {
            return {
                ...state,
                enrolledCourses: action.courses,
            };
        } else {
            return state;
        }
    } else {
        return state;
    }
}
