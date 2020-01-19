import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BreadcrumbItem } from 'app/types';

@Component({
  selector: 'app-above-content',
  templateUrl: './above-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AboveContentComponent {

  @Input()
  breadcrumbs: BreadcrumbItem[] = [];

}
