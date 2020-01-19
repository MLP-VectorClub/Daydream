import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Appearance } from 'app/types';

@Component({
  selector: 'app-color-guide-appearance',
  templateUrl: './color-guide-appearance.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ColorGuideAppearanceComponent {

  @Input()
  appearance: Appearance;

}
