// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.scss';
import registerServiceWorker from './registerServiceWorker';

import App from './components/App';
import store, { history } from './store';


const router = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Route path="/" component={App}>
            </Route>
        </ConnectedRouter>
    </Provider>
);

// $FlowExpectedError
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
