import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ColorGuideService } from 'app/color-guide/color-guide.service';
import * as fromActions from 'app/store/actions/color-guide.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class ColorGuideEffects {

  @Effect()
  loadAppearancesEffect$: Observable<fromActions.ColorGuideActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.LOAD_APPEARANCES),
    switchMap(({ payload }) => this.colorGuideService.getAll(payload).pipe(
      map(data => new fromActions.LoadAppearancesYay(data)),
      catchError(() => of(new fromActions.LoadAppearancesNay())),
    )),
  );

  constructor(private actions$: Actions,
              private colorGuideService: ColorGuideService) {
  }
}
