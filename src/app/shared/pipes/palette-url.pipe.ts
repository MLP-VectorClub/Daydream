import { Pipe, PipeTransform } from '@angular/core';
import { ENDPOINTS } from 'app/shared/endpoints';
import { Appearance } from 'app/types';

@Pipe({ name: 'paletteUrl' })
export class PaletteUrlPipe implements PipeTransform {
  transform(appearance: Appearance) {
    return ENDPOINTS.APPEARANCE_PALETTE(appearance.id);
  }
}
