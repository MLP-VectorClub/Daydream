import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { mutate } from 'swr';
import { authActions } from '../slices';
import { ENDPOINTS, httpResponseMapper } from '../../utils';
import { userService } from '../../services';
import { ActionsType } from '../rootReducer';

const signInEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.signIn.match),
  switchMap(action => userService.signIn(action.payload).pipe(
    switchMap(() => userService.getMe().pipe(
      map(response => {
        mutate(ENDPOINTS.USERS_ME, response.data);
        return authActions.signInSuccess(response.data);
      }),
    )),
    catchError(err => of(authActions.signInFailure(httpResponseMapper(err)))),
  )),
);

const signOutEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.signOut.match),
  switchMap(() => userService.signOut().pipe(
    map(() => {
      mutate(ENDPOINTS.USERS_ME, undefined);
      return authActions.signOutSuccess();
    }),
    catchError(err => of(authActions.signOutFailure(httpResponseMapper(err)))),
  )),
);

const registerEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.register.match),
  switchMap(action => userService.register(action.payload).pipe(
    switchMap(() => userService.getMe().pipe(
      map(response => {
        mutate(ENDPOINTS.USERS_ME, response.data);
        return authActions.registerSuccess(response.data);
      }),
    )),
    catchError(err => of(authActions.registerFailure(httpResponseMapper(err)))),
  )),
);

export default [signInEpic, signOutEpic, registerEpic];
