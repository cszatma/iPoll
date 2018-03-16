// @flow

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import client from './Client';

class App extends Component<{}> {
  render() {
      client.request('users', 'get').then(json => console.log(json));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
