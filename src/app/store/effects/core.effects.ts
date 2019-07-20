import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import * as fromActions from 'app/store/actions/core.actions';
import { isArray } from 'lodash';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class CoreEffects {

  @Effect()
  detectLanguageEffect$: Observable<fromActions.CoreActions> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.DETECT_LANGUAGE),
    map(() => new fromActions.LanguageDetectedAction(this.trans.currentLang)),
  );

  @Effect({ dispatch: false })
  changeLanguageEffect$: Observable<string> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.CHANGE_LANGUAGE),
    map((action: fromActions.ChangeLanguageAction) => action.payload),
    tap((lang: string) => this.trans.use(lang)),
  );

  lastSetTitlePayload: fromActions.SetTitleActionPayload;

  @Effect({ dispatch: false })
  setTitleEffect$: Observable<any> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.SET_TITLE),
    map((action: fromActions.SetTitleAction) => action.payload),
    tap(data => {
      let titleKey, titleParams = null;
      if (isArray(data)) {
        titleKey = data[0];
        titleParams = data[1];
      } else titleKey = data;
      this.lastSetTitlePayload = data;

      let title = this.trans.instant('GLOBAL.SITE_NAME');
      if (typeof titleKey !== 'undefined')
        title = `${this.trans.instant(`TITLES.${titleKey}`, titleParams)} - ${title}`;
      this.title.setTitle(title);
    }),
  );

  @Effect()
  setTitleOnTranslationEffect$: Observable<fromActions.SetTitleAction> = this.actions$.pipe(
    ofType(fromActions.ActionTypes.CHANGE_LANGUAGE),
    map((action: fromActions.ChangeLanguageAction) => action.payload),
    map(() => new fromActions.SetTitleAction(this.lastSetTitlePayload)),
  );

  constructor(private actions$: Actions,
              private trans: TranslateService,
              private title: Title) {
  }
}
