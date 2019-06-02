import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-link',
  templateUrl: './user-link.component.html',
})
export class UserLinkComponent {

  @Input()
  userName: string;

  @Input()
  text = '';

}
