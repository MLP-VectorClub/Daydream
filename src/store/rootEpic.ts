import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import auth from './epics/authEpics';
import core from './epics/coreEpics';

export const epics = [
  ...auth,
  ...core,
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootEpic = (action$: any, state$: any, dependencies: any) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  combineEpics<any, any, any, any>(...epics)(action$, state$, dependencies).pipe(
    catchError((error, source) => {
      console.error(error);
      return source;
    }),
  );
