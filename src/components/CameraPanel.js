import React, { Component } from 'react';
import { Observable } from 'rxjs/Rx';
import { getStore, store$ } from '../store/store';
import '../store/actions';

import {
  captureCam,
  enableCam,
  disableCam,
  takeCapture
} from '../lib/webCamUtil';

console.log('store is ', getStore());
store$.subscribe(console.log);

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

  capture = () =>
    Observable.interval(10000)
      .take(3)
      .subscribe(() => takeCapture('#camera'));

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
