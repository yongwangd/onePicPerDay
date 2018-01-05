import * as R from 'ramda';
import { DateTime } from 'luxon';
import { getHashedUUID } from '../lib/idUtils';

export const createNewJob = (pattern, running = true) => {
  const newJob = {
    id: getHashedUUID(),
    pattern,
    running,
    createTime: DateTime.local().toString()
  };
  return R.assocPath(['jobs', newJob.id], newJob);
};
export const startJob = id => R.assocPath(['jobs', id, 'running'], true);
export const stopJob = id => R.assocPath([('jobs', id, 'running')], false);
