import './assets/css/App.css';
import React, { Component } from 'react';
import CameraPanel from './components/CameraPanel';
import CronConfig from './components/CronConfig';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, Electron!</h1>
        <p>
          I hope you enjoy using basic-electron-react-boilerplate to start your
          dev off right! Hope it work. and it doessdd
        </p>
        <CronConfig />
        <CameraPanel />
      </div>
    );
  }
}

export default App;
