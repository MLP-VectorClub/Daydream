import { Component, Input, ViewEncapsulation } from '@angular/core';
import { AppUser } from 'app/types';

@Component({
  selector: 'app-sidebar-user-info',
  templateUrl: './sidebar-user-info.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarUserInfoComponent {

  @Input()
  user: AppUser;

  @Input()
  signedIn: boolean;

}
