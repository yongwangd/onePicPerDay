import electron from 'electron';
import path from 'path';
import fs from 'fs';

console.log('hello');
function parseDataFile(filePath, defaults = {}) {
  // We'll try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which we then parse into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

console.log('work');
const createStore = (opts = {}) => {
  const userDataPath = (electron.app || electron.remote.app).getPath(
    'userData'
  );
  console.log('user path', userDataPath);

  const dataFile = path.join(userDataPath, 'userData.json');

  let store = parseDataFile(dataFile, opts.defaults);

  const get = key => store[key];
  const set = (key, value) => {
    store = {
      ...store,
      [key]: value
    };
    fs.writeFileSync(dataFile, JSON.stringify(store));
  };
  return { get, set };
};
const st = createStore({});
st.set('name', 'Yong Wang');
console.log(st.get('name'));

export default createStore;
