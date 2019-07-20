import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { select, Store, StoreModule } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import * as fromAuthActions from 'app/store/actions/auth.actions';
import { AuthEffects } from 'app/store/effects/auth.effects';
import { AppState } from 'app/store/reducers';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import { filter, take } from 'rxjs/operators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuthReducer.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => () => new Promise<void>(resolve => {
        store.dispatch(new fromAuthActions.CheckAuthAction());
        store.pipe(select(fromAuthReducer.data)).pipe(
          filter(value => value !== null),
          take(1),
        ).subscribe(() => resolve());
      }),
      deps: [Store],
      multi: true,
    },
  ],
})
export class AuthModule {
}
