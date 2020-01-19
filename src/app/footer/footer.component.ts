import { Component, ViewEncapsulation } from '@angular/core';
import * as config from 'app/app.config';
import { GIT } from 'environments/git';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent {

  g = GIT;
  c = config;

  openContactModal() {
    // TODO Implement
  }
}
