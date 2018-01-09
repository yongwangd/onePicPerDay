import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';

const { app, dialog } = remote;

export const getMediaFolder = () =>
  path.join(app.getPath('pictures'), 'onePicPerDay');
export const getAudioFolder = () => path.join(getMediaFolder(), 'Audios');
export const getVideoFolder = () => path.join(getMediaFolder(), 'Videos');

export function processBase64Image(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
  // const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }
  const [, type, data] = matches;
  return {
    type,
    data: Buffer.from(data, 'base64')
  };
}

export function getSaveFilePath(extension = 'png') {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(
      {
        filters: [{ name: 'Images', extensions: [extension] }]
      },
      filename => {
        if (!filename) {
          reject(new Error('No File selected'));
          return;
        }
        resolve(filename);
      }
    );
  });
}

export function writeDataToFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, err => {
      if (err) {
        console.error(err);
        reject(err);
      } else resolve('saved');
    });
  });
}

// export function captureCam(mediaPath = getMediaFolder()) {
//   return new Promise((resolve, reject) => {
//     WebCam.snap(uri => {
//       const imageBuffer = processBase64Image(uri);

//       return writeDataToFile(
//         path.join(mediaPath, `${currentTimeStr()}.png`),
//         imageBuffer.data
//       )
//         .then(() => resolve('done'))
//         .catch(e => reject(e));
//     });
//   });
// }
