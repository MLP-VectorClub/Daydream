import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
import { of } from 'rxjs';
import { queryCache } from 'react-query';
import { ENDPOINTS, httpResponseMapper } from 'src/utils';
import { authActions } from 'src/store/slices';
import { userService } from 'src/services';
import { ActionsType } from 'src/store/rootReducer';

const invalidateUserSpecificQueries = () => {
  queryCache.invalidateQueries(ENDPOINTS.USER_PREFS_ME);
  queryCache.invalidateQueries(ENDPOINTS.USEFUL_LINKS_SIDEBAR);
};

const signInEpic = (action$: ActionsObservable<ActionsType>) => action$.pipe(
  filter(authActions.signIn.match),
  switchMap(action => userService.signIn(action.payload).pipe(
    switchMap(() => userService.getMe().pipe(
      map(response => {
        queryCache.setQueryData(ENDPOINTS.USERS_ME, response.data);
        invalidateUserSpecificQueries();
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
      queryCache.setQueryData(ENDPOINTS.USERS_ME, undefined);
      invalidateUserSpecificQueries();
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
        queryCache.setQueryData(ENDPOINTS.USERS_ME, response.data);
        invalidateUserSpecificQueries();
        return authActions.registerSuccess(response.data);
      }),
    )),
    catchError(err => of(authActions.registerFailure(httpResponseMapper(err)))),
  )),
);

export default [signInEpic, signOutEpic, registerEpic];
