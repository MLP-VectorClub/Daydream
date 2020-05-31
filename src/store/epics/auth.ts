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
    map(response => authActions.checkAuthSuccess(response.data)),
    catchError(err => of(authActions.checkAuthFailure(httpResponseMapper(err)))),
  )),
);

const signInEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.signIn.match),
  switchMap(action => userService.signIn(action.payload).pipe(
    switchMap(() => userService.getMe().pipe(
      map(response => authActions.signInSuccess(response.data)),
    )),
    catchError(err => of(authActions.signInFailure(httpResponseMapper(err)))),
  )),
);

const signOutEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.signOut.match),
  switchMap(() => userService.signOut().pipe(
    map(() => authActions.signOutSuccess()),
    catchError(err => of(authActions.signOutFailure(httpResponseMapper(err)))),
  )),
);

const registerEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.register.match),
  switchMap(action => userService.register(action.payload).pipe(
    switchMap(() => userService.getMe().pipe(
      map(response => authActions.registerSuccess(response.data)),
    )),
    catchError(err => of(authActions.registerFailure(httpResponseMapper(err)))),
  )),
);


export default [checkAuthEpic, signInEpic, signOutEpic, registerEpic];
