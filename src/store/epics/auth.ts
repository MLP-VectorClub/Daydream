import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { authActions } from '../slices';
import { httpResponseMapper } from '../../utils';
import { userService } from '../../services';
import { ActionsType } from '../rootReducer';

const checkAuthEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.checkAuth.match),
  switchMap(() => userService.getMe().pipe(
    map(response => authActions.checkAuthSuccess(response.data.user)),
    catchError(err => of(authActions.checkAuthFailure(httpResponseMapper(err)))),
  )),
);


export default [checkAuthEpic];
