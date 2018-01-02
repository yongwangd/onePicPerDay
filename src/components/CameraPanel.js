import React, { Component } from 'react';
import WebCam from 'webcamjs';
import {
  getSaveFilePath,
  processBase64Image,
  witeDataToFile
} from '../lib/imageUtils';

class CameraPanel extends Component {
  state = {
    enabled: false
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
    console.log('capture click');
    WebCam.snap(uri => {
      const imageBuffer = processBase64Image(uri);
      getSaveFilePath()
        .then(filename => witeDataToFile(filename, imageBuffer.data))
        .then(console.log('saved'));
    });
  };
  render() {
    const { start, capture } = this;
    const { enabled } = this.state;
    return (
      <div className="camera-panel">
        <div
          id="camera"
          ref={cam => {
            console.log('cam', cam);
            this.cam = cam;
          }}
        />
        {enabled && <button onClick={start}>Disable</button>}
        {!enabled && <button onClick={start}>start</button>}
        <button onClick={capture}>capture</button>
      </div>
    );
  }
}

export default CameraPanel;
