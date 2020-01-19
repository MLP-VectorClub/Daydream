import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ColorGuideService } from 'app/color-guide/color-guide.service';
import { SpriteUrlPipe } from 'app/shared/pipes';
import * as fromActions from 'app/store/actions/color-guide.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

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
        map(data => new fromActions.LoadAppearancesSuccess(data)),
        catchError(() => of(new fromActions.LoadAppearancesFailure())),
      );
    }),
  );

  constructor(private actions$: Actions,
              private colorGuideService: ColorGuideService) {
  }
}
