import * as R from 'ramda';
import { DateTime } from 'luxon';
import { getHashedUUID } from '../lib/idUtils';
import { dispatch } from './configStore';

const createNewJob = (pattern, running = true) => {
  const newJob = {
    id: getHashedUUID(),
    pattern,
    running,
    createTime: DateTime.local().toString()
  };
  return R.assocPath(['jobs', newJob.id], newJob);
};
const deleteJob = id => R.dissocPath(['jobs', id]);
const startJob = id => R.assocPath(['jobs', id, 'running'], true);
const stopJob = id => R.assocPath([('jobs', id, 'running')], false);



const api = {
  createNewJob: (pattern, running) => dispatch(createNewJob(pattern, running)),
  deleteJob: id => dispatch(deleteJob(id)),
  startJob: id => dispatch(startJob(id)),
  stopJob: id => dispatch(stopJob(id))
};

export default api;
