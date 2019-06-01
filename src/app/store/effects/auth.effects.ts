import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromActions from 'app/store/actions/auth.actions';
import { UserService } from 'app/user/user.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class CoreEffects {

  @Effect()
  checkAuthEffect$: Observable<fromActions.AuthActions> = this.actions$.pipe(
    ofType(fromActions.AuthActionTypes.CHECK_AUTH),
    switchMap(() => this.userService.getMe().pipe(
      map(user => new fromActions.CheckAuthSuccess(user)),
      catchError(() => of(new fromActions.CheckAuthFail())),
    )),
  );

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}
