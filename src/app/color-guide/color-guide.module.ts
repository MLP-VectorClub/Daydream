import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ColorGuideRoutingModule } from 'app/color-guide/color-guide-routing.module';
import { ColorGuideService } from 'app/color-guide/color-guide.service';
import { SharedModule } from 'app/shared/shared.module';
import * as fromEffects from 'app/store/effects/color-guide.effects';
import * as fromReducer from 'app/store/reducers/color-guide.reducer';
import { ColorGuideComponent } from './color-guide.component';

@NgModule({
  declarations: [ColorGuideComponent],
  imports: [
    CommonModule,
    SharedModule,
    ColorGuideRoutingModule,
    StoreModule.forFeature('color-guide', fromReducer.reducer),
    EffectsModule.forFeature([fromEffects.ColorGuideEffects]),
  ],
  providers: [ColorGuideService],
})
export class ColorGuideModule {
}
