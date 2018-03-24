import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import coursesReducer from './coursesReducer';

const rootReducer = combineReducers({
    coursesReducer,
    router: routerReducer,
});

export default rootReducer;