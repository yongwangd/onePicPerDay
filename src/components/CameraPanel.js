import React, { Component } from 'react';
import WebCam from 'webcamjs';
import {
  getSaveFilePath,
  processBase64Image,
  writeDataToFile,
  captureCam
} from '../lib/imageUtils';
import {
  setInterval,
  setImmediate,
  setTimeout
} from 'core-js/library/web/timers';

class CameraPanel extends Component {
  state = {
    enabled: false
  };

  enableCam = () => {
    const { enabled } = this.state;
    if (enabled) return;
    WebCam.attach(this.cam);
    this.setState({ enabled: true });
  };

  disableCam = () => {
    const { enabled } = this.state;
    if (!enabled) return;
    WebCam.reset();
    this.setState({ enabled: false });
  };

  start = () => {
    const { enabled } = this.state;
    if (enabled) {
      WebCam.reset();
      this.setState({ enabled: false });
    } else {
      WebCam.attach(this.cam);
      this.setState({ enabled: true });
    }
  };

  capture = () => {
    const { enableCam, disableCam } = this;
    setInterval(() => {
      enableCam();
      setTimeout(() => {
        captureCam();
        disableCam();
      }, 500);
    }, 4000);
  };

  render() {
    const { capture, enableCam, disableCam } = this;
    const { enabled } = this.state;
    return (
      <div className="camera-panel">
        <div id="camera" ref={cam => (this.cam = cam)} />
        {enabled && <button onClick={disableCam}>Disable</button>}
        {!enabled && <button onClick={enableCam}>start</button>}
        <button onClick={captureCam}>capture</button>
        <button onClick={capture}>capture 30s</button>
      </div>
    );
  }
}

export default CameraPanel;
