import React, { Component } from 'react';
import { captureCam, enableCam, disableCam } from '../lib/webCamUtil';

class CameraPanel extends Component {
  state = {
    enabled: false
  };

  showCam = () => {
    const { enabled } = this.state;
    if (enabled) return;
    enableCam('#camera').then(() => this.setState({ enabled: true }));
  };

  closeCam = () => {
    const { enabled } = this.state;
    if (!enabled) return;
    disableCam();
    this.setState({ enabled: false });
  };

  capture = () => {
    setInterval(() => {
      enableCam('#camera')
        .then(() => captureCam())
        .then(() => disableCam(300));
    }, 10000);
  };

  render() {
    const { capture, showCam, closeCam } = this;
    const { enabled } = this.state;
    return (
      <div className="camera-panel">
        <div id="camera" ref={cam => (this.cam = cam)} />
        {enabled && <button onClick={closeCam}>Disable</button>}
        {!enabled && <button onClick={showCam}>start</button>}
        <button onClick={captureCam}>capture</button>
        <button onClick={capture}>capture 30s</button>
      </div>
    );
  }
}

export default CameraPanel;
