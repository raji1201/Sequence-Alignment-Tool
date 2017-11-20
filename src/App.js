import React, { Component } from 'react';
import './App.css';
import Login from './Login'
import Register from './Register'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Register />
      </div>
    );
  }
}

export default App;
