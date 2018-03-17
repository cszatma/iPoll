// @flow

import React from 'react';
import ReactDOM from 'react-dom';
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
            <App />
        </ConnectedRouter>
    </Provider>
);

// $FlowExpectedError
ReactDOM.render(router, document.getElementById('root'));
registerServiceWorker();
