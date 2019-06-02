import { Component, Input } from '@angular/core';
import { NullableUser } from 'app/types';

@Component({
  selector: 'app-sidebar-user-info',
  templateUrl: './sidebar-user-info.component.html',
  styleUrls: ['./sidebar-user-info.component.scss'],
})
export class SidebarUserInfoComponent {

  @Input()
  user: NullableUser;

  @Input()
  signedIn: boolean;

}
