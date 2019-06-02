import { Component, Input } from '@angular/core';
import { GUEST_AVATAR } from 'app/app.config';
import { AvatarProvider } from 'app/types';

@Component({
  selector: 'app-avatar-wrap',
  templateUrl: './avatar-wrap.component.html',
  styleUrls: ['./avatar-wrap.component.scss'],
})
export class AvatarWrapComponent {

  @Input()
  avatarUrl: string;

  @Input()
  avatarProvider: AvatarProvider;

  guestAvatar = GUEST_AVATAR;

}
