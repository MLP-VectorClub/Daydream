import { Pipe, PipeTransform } from '@angular/core';
import { AvatarProvider } from 'app/types';

type AvatarShape = 'square' | 'circle';

@Pipe({ name: 'avatarShape' })
export class AvatarShapePipe implements PipeTransform {
  private readonly shapeMap: { [key in AvatarProvider]: AvatarShape } = {
    deviantart: 'square',
    discord: 'circle',
  };

  transform(provider: AvatarProvider): AvatarShape {
    return this.shapeMap[provider];
  }
}
