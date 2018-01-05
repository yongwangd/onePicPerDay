import { Subject } from 'rxjs/Rx';

const action$ = new Subject();

export const dispatch = transformFn => action$.next(transformFn);

export const startStoreStream = initStore =>
  action$.startWith(initStore).scan((acc, transformFn) => transformFn(acc));
