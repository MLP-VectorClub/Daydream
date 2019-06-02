import { Component, Input } from '@angular/core';
import { Appearance } from 'app/types';

@Component({
  selector: 'app-color-guide-appearance',
  templateUrl: './color-guide-appearance.component.html',
  styleUrls: ['./color-guide-appearance.component.scss'],
})
export class ColorGuideAppearanceComponent {

  @Input()
  appearance: Appearance;

}
