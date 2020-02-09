import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { GUEST_AVATAR } from 'app/app.config';
import { AvatarProvider, Nullable } from 'app/types';
import * as md5 from 'md5';

@Component({
  selector: 'app-avatar-wrap',
  templateUrl: './avatar-wrap.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AvatarWrapComponent implements OnChanges {

  @Input()
  avatarUrl: Nullable<string>;

  @Input()
  avatarProvider: AvatarProvider;

  @Input()
  email: Nullable<string> = null;

  @Input()
  size: number;

  currentAvatarUrl = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.avatarUrl || changes.email || changes.size)
      this.currentAvatarUrl = this.avatarUrl || this.getGuestAvatar();
  }

  private getGuestAvatar() {
    if (this.email === null)
      return GUEST_AVATAR;

    const defaultAvatar = encodeURIComponent(window.location.origin + GUEST_AVATAR);
    return `https://www.gravatar.com/avatar/${md5(this.email)}?size=${this.size}&d=${defaultAvatar}&ngsw-bypass`;
  }
}
