// @flow

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers/rootReducer';
import type { Course } from './utils/types';

type State = {
    +courses: Course[],
};

const defaultState: State = {
    courses: [],
};

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(middleware),
);

export { history };
export type { State };
export default store;
