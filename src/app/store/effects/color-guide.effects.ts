import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ColorGuideService } from 'app/color-guide/color-guide.service';
import { SpriteUrlPipe } from 'app/shared/pipes';
import * as fromActions from 'app/store/actions/color-guide.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserPrefsService } from 'app/core/user-prefs.service';

@Injectable()
export class ColorGuideEffects {

  pipe = new SpriteUrlPipe();

  lastLoadedAppearancesPayload: fromActions.LoadAppearancesAction['payload'];

  @Effect()
  loadAppearancesEffect$: Observable<fromActions.ColorGuideActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LOAD_APPEARANCES),
    switchMap(({ payload }) => {
      this.lastLoadedAppearancesPayload = payload;
      return this.colorGuideService.getAll(payload).pipe(
        map(data => new fromActions.LoadAppearancesYay(data)),
        catchError(() => of(new fromActions.LoadAppearancesNay())),
      );
    }),
  );

  @Effect()
  changePageSizeEffect$: Observable<fromActions.ColorGuideActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.CHANGE_PAGE_SIZE),
    switchMap(({ payload }) => this.userPrefsService.set('cg_itemsperpage', payload).pipe(
      map(data => new fromActions.ChangePageSizeActionYay(payload)),
      catchError(() => of(new fromActions.ChangePageSizeActionNay())),
    )),
  );

  @Effect()
  changePageSizeYayEffect$: Observable<fromActions.ColorGuideActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.CHANGE_PAGE_SIZE_YAY),
    map(() => new fromActions.LoadAppearancesAction(this.lastLoadedAppearancesPayload)),
  );

  constructor(private actions$: Actions,
              private colorGuideService: ColorGuideService,
              private userPrefsService: UserPrefsService,
              private http: HttpClient) {
  }
}
