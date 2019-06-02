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
      map(user => new fromActions.CheckAuthYay(user)),
      catchError(() => of(new fromActions.CheckAuthNay())),
    )),
  );

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}
