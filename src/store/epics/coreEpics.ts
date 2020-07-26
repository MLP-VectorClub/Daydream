import {
  catchError,
  filter,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import {
  authActions,
  coreActions,
} from '../slices';
import { coreService } from '../../services';
import { ActionsType } from '../rootReducer';

const initCsrfEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(coreActions.initCsrf.match),
  switchMap(() => coreService.initCsrf().pipe(
    mergeMap(() => [
      coreActions.initCsrfSuccess(),
      authActions.checkAuth(),
    ]),
    catchError(() => of(coreActions.initCsrfFailure())),
  )),
);

export default [initCsrfEpic];
