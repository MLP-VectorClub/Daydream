import { Component, Input, ViewEncapsulation } from '@angular/core';
import { GUEST_AVATAR } from 'app/app.config';
import { AvatarProvider, Nullable } from 'app/types';

@Component({
  selector: 'app-avatar-wrap',
  templateUrl: './avatar-wrap.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AvatarWrapComponent {

  @Input()
  avatarUrl: Nullable<string>;

  @Input()
  avatarProvider: AvatarProvider;

  @Input()
  size: number;

  guestAvatar = GUEST_AVATAR;

}
