import electron from 'electron';
import path from 'path';
import fs from 'fs';
import Rx from 'rxjs/Rx';
import * as R from 'ramda';
import { startStoreStream } from './configStore';
import { cronStream } from '../lib/cronUtils';

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

let lastCrons = null;

const makeCronJob = store => {
  console.log(store);

  const runningJobs = Object.entries(store.jobs)
    .map(([id, value]) => ({
      id,
      ...value
    }))
    .filter(job => job.running);
  if (lastCrons) {
    lastCrons.forEach(it => it.cron.stop());
  }
  lastCrons = runningJobs.map(job => ({ job, cron: cronStream(job.pattern) }));

  return Rx.Observable.merge(...lastCrons.map(it => it.cron.map(() => it.job)));
};

store$.switchMap(makeCronJob).subscribe(x => console.log('switch', x));

store$.subscribe(val => {
  store = val;

  fs.writeFileSync(dataFile, JSON.stringify(store));
});
