import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { NEVER } from 'rxjs';
import { authActions, coreActions } from '../slices';
import { coreService } from '../../services';
import { ActionsType } from '../rootReducer';

const initCsrfEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(coreActions.initCsrf.match),
  switchMap(() => coreService.initCsrf().pipe(
    map(() => authActions.checkAuth()),
    catchError(() => NEVER),
  )),
);


export default [initCsrfEpic];
