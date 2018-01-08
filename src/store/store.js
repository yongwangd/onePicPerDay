import electron from 'electron';
import path from 'path';
import fs from 'fs';
import { startStoreStream } from './configStore';

let store = null;

const initValue = {
  jobs: {}
};

function parseDataFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    return null;
  }
}

const userDataPath = (electron.app || electron.remote.app).getPath('userData');
const dataFile = path.join(userDataPath, 'userData.json');
const initStore = parseDataFile(dataFile) || initValue;

export const getStore = () => store;
export const store$ = startStoreStream(initStore);

store$.subscribe(val => {
  store = val;
  fs.writeFileSync(dataFile, JSON.stringify(store));
});
