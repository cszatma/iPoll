// @flow

import { actionTypes } from '../utils/actionCreators';
import type { Action } from '../utils/actionCreators';
import type { Course } from '../utils/types';

type State = Course[];

export default function coursesReducer(state: State = [], action: Action): State {
    if (action.type === actionTypes.addCourse) {
        return [
                ...state,
                action.course,
            ];
    } else if (action.type === actionTypes.setCourses) {
        return action.courses;
    } else {
        return state;
    }
}
