import { Pipe, PipeTransform } from '@angular/core';
import { AvatarProvider } from 'app/types';
import { NzAvatarShape } from 'ng-zorro-antd';

@Pipe({ name: 'avatarShape' })
export class AvatarShapePipe implements PipeTransform {
  private readonly shapeMap: { [key in AvatarProvider]: NzAvatarShape } = {
    deviantart: 'square',
    discord: 'circle',
  };

  transform(provider: AvatarProvider): NzAvatarShape {
    return this.shapeMap[provider];
  }
}
