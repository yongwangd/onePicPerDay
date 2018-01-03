import WebCam from 'webcamjs';
import { Observable, Subject } from 'rxjs/Rx';
import path from 'path';
import {
  getMediaFolder,
  writeDataToFile,
  processBase64Image
} from './imageUtils';
import { currentTimeStr } from './dateTimeUtil';
import { setTimeout } from 'timers';

export const camLive$ = Observable.fromEvent(WebCam, 'live');

camLive$.subscribe(e => console.log('sub live', e));

export const enableCam = selector =>
  new Promise((resolve, reject) => {
    WebCam.attach(selector);
    return camLive$.catch(err => reject(err)).subscribe(e => resolve(e));
  });

export const disableCam = (delay = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      WebCam.reset();
      resolve('done');
    }, delay);
  });

export const captureCam = () =>
  new Promise((resolve, reject) => {
    WebCam.snap(uri => {
      const imageBuffer = processBase64Image(uri);

      return writeDataToFile(
        path.join(getMediaFolder(), `${currentTimeStr()}.png`),
        imageBuffer.data
      )
        .then(() => resolve('done'))
        .catch(e => reject(e));
    });
  });
