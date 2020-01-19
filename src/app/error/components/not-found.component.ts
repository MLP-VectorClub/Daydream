import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbItem } from 'app/types';

@Component({
  selector: 'app-error',
  templateUrl: './not-found.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent {

  breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'ERROR_PAGES.BREADCRUMBS.START',
      url: null,
    },
    {
      label: 'ERROR_PAGES.BREADCRUMBS.NOT_FOUND',
      url: null,
      current: true,
    },
  ];

}
