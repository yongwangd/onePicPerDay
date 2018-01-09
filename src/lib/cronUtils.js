import { Subject } from 'rxjs/Rx';
import { CronJob } from 'cron';

export const cronStream = (pattern, stopCallback = () => {}) => {
  const cron$ = new Subject();
  let count = 0;

  const job = new CronJob(
    pattern,
    () => {
      console.log('inside con', count);
      cron$.next(count);
      count += 1;
    },
    stopCallback
  );
  job.start();

  cron$.stop = () => job.stop();

  return cron$;
  // return {
  //   subscribe: fn => cron$.subscribe(fn),
  //   start: () => job.start(),
  //   stop: () => job.stop(),
  //   isRunning: () => job.running === true
  // };
};
