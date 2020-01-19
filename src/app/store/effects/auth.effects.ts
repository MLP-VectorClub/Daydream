import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from 'app/store/actions/auth.actions';
import { UserService } from 'app/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {

  @Effect()
  checkAuthEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.CHECK_AUTH),
    switchMap(() => this.userService.getMe().pipe(
      map(user => new fromActions.CheckAuthSuccess(user)),
      catchError(() => of(new fromActions.CheckAuthFailure())),
    )),
  );

  @Effect()
  logoutEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LOGOUT),
    switchMap(() => this.userService.logout().pipe(
      map(() => new fromActions.LogoutSuccess()),
      catchError(() => of(new fromActions.LogoutFailure())),
    )),
  );

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}
