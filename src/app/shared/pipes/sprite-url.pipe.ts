import { Pipe, PipeTransform } from '@angular/core';
import { ENDPOINTS } from 'app/shared/endpoints';
import { Appearance } from 'app/types';

@Pipe({ name: 'spriteUrl' })
export class SpriteUrlPipe implements PipeTransform {
  transform(appearance: Appearance) {
    return ENDPOINTS.APPEARANCE_SPRITE(appearance.id, { hash: appearance.sprite.hash });
  }
}
