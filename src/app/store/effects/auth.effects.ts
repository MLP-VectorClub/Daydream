import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from 'app/store/actions/auth.actions';
import { UserService } from 'app/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { httpResponseMapper } from 'app/shared/utils';

@Injectable()
export class AuthEffects {

  @Effect()
  checkAuthEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.CHECK_AUTH),
    switchMap(() => this.userService.getMe().pipe(
      map(response => new fromActions.CheckAuthSuccessAction(response.user)),
      catchError(() => of(new fromActions.CheckAuthFailureAction())),
    )),
  );

  @Effect()
  loginEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LOGIN),
    switchMap(({ payload }) => this.userService.login(payload).pipe(
      switchMap(() => this.userService.getMe().pipe(
        map(data => new fromActions.LoginSuccessAction(data.user))
      )),
      catchError(err => of(new fromActions.LoginFailureAction(httpResponseMapper(err)))),
    )),
  );

  @Effect()
  logoutEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LOGOUT),
    switchMap(() => this.userService.logout().pipe(
      map(() => new fromActions.LogoutSuccessAction()),
      catchError(err => of(new fromActions.LogoutFailureAction(httpResponseMapper(err)))),
    )),
  );

  @Effect()
  registerEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.REGISTER),
    switchMap(({ payload }) => this.userService.register(payload).pipe(
      switchMap(() => this.userService.getMe().pipe(
        map(data => new fromActions.RegisterSuccessAction(data.user))
      )),
      catchError(err => of(new fromActions.RegisterFailureAction(httpResponseMapper(err)))),
    )),
  );

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}
