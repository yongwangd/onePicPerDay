import { remote } from 'electron';
import fs from 'fs';

const { dialog } = remote;

export function processBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}

export function getSaveFilePath() {
  return new Promise((resolve, reject) => {
    dialog.showSaveDialog(
      {
        filters: [{ name: 'Images', extensions: ['png'] }]
      },
      filename => {
        if (!filename) {
          reject('No file selected');
          return;
        }
        resolve(filename);
      }
    );
  });
}

export function witeDataToFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, err => {
      if (err) reject('error');
      else resolve('saved');
    });
  });
}
