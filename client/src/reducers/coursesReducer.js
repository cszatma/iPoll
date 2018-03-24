// @flow

import { actionTypes } from '../utils/actionCreators';
import type { Action } from '../utils/actionCreators';
import type { State } from '../store';
import { getDefaultState } from '../store';

export default function coursesReducer(state: State = getDefaultState(), action: Action): State {
    if (action.type === actionTypes.addCourse) {
        return {
            ...state,
            courses: [
                ...state.courses,
                action.course,
            ],
        };
    } else {
        return state;
    }
}
