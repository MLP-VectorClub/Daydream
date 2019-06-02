import { Pipe, PipeTransform } from '@angular/core';
import { makeUrlSafe } from 'app/shared/utils';
import { Appearance } from 'app/types';

@Pipe({ name: 'appearancePage' })
export class AppearancePagePipe implements PipeTransform {
  transform(appearance: Appearance) {
    return `/cg/v/${appearance.id}-${makeUrlSafe(appearance.label)}`;
  }
}
