import { Component } from '@angular/core';
import { LaxBreadcrumbOption } from 'app/types';

@Component({
  selector: 'app-error',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {

  breadcrumbs: LaxBreadcrumbOption[] = [
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
