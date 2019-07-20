import { Component, Input } from '@angular/core';
import { LaxBreadcrumbOption } from 'app/types';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {

  @Input()
  items: LaxBreadcrumbOption[] = [];

}
