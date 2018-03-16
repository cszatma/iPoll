// @flow

import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from './reducers/rootReducer';

const defaultState = {};
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    rootReducer,
    defaultState,
    applyMiddleware(middleware)
);

export { history };
export default store;