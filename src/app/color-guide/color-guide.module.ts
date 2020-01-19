import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ColorGuideRoutingModule } from 'app/color-guide/color-guide-routing.module';
import { ColorGuideService } from 'app/color-guide/color-guide.service';
import {
  ColorGuideAppearanceComponent,
  ColorGuideAppearanceListComponent,
  ColorGuideAppearanceSpriteComponent,
  ColorGuideComponent,
} from 'app/color-guide/components';
import { SharedModule } from 'app/shared/shared.module';
import * as fromEffects from 'app/store/effects/color-guide.effects';
import * as fromReducer from 'app/store/reducers/color-guide.reducer';
import { InViewportModule } from 'ng-in-viewport';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ColorGuideComponent,
    ColorGuideAppearanceComponent,
    ColorGuideAppearanceListComponent,
    ColorGuideAppearanceSpriteComponent,
  ],
    imports: [
        CommonModule,
        SharedModule,
        ColorGuideRoutingModule,
        StoreModule.forFeature('color-guide', fromReducer.reducer),
        EffectsModule.forFeature([fromEffects.ColorGuideEffects]),
        InViewportModule,
        NgbAlertModule,
    ],
  providers: [ColorGuideService],
})
export class ColorGuideModule {
}
