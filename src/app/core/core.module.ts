import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from 'app/auth/auth.module';
import { CoreEffects } from 'app/store/effects/core.effects';
import { reducer } from 'app/store/reducers/core.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('core', reducer),
    EffectsModule.forFeature([CoreEffects]),
    AuthModule,
  ],
  providers: [],
})
export class CoreModule {
}
