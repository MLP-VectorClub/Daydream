import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { select, Store, StoreModule } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import * as fromAuthActions from 'app/store/actions/auth.actions';
import { AppState } from 'app/store/reducers';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import { filter, take } from 'rxjs/operators';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuthReducer.reducer),
  ],
  providers: [
    AuthService,
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => () => new Promise<boolean>(resolve => {
        store.dispatch(new fromAuthActions.CheckAuthAction());
        const sub = store.pipe(select(fromAuthReducer.authSignedIn)).pipe(
          take(1),
          filter(value => value !== null),
        ).subscribe(value => {
          sub.unsubscribe();
          resolve(value);
        });
      }),
      deps: [Store],
      multi: true,
    },
  ],
})
export class AuthModule {
}
