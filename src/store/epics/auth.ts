import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { checkAuth, checkAuthSuccess, checkAuthFailure } from '../slices/authSlice';
import { httpResponseMapper } from '../../utils/common';
import { userService } from '../../services';
import { ActionsType } from '../rootReducer';

const checkAuthEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(checkAuth.match),
  switchMap(() => userService.getMe().pipe(
    map(response => checkAuthSuccess(response.data.user)),
    catchError(err => of(checkAuthFailure(httpResponseMapper(err)))),
  )),
);


export default [checkAuthEpic];
