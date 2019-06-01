import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreEffects } from 'app/store/effects/core.effects';
import { reducer } from 'app/store/reducers/core.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature('core', reducer),
    EffectsModule.forFeature([CoreEffects]),
  ],
  providers: [],
})
export class CoreModule {
}
