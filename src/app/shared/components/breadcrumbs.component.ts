import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BreadcrumbItem } from 'app/types';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent {

  @Input()
  items: BreadcrumbItem[] = [];

}
