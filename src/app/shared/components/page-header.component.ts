import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent {

  @Input()
  title: string;

  @Input()
  subtitle: null;

}
