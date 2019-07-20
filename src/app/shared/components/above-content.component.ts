import { Component, Input } from '@angular/core';
import { LaxBreadcrumbOption } from 'app/types';

@Component({
  selector: 'app-above-content',
  templateUrl: './above-content.component.html',
  styleUrls: ['./above-content.component.scss'],
})
export class AboveContentComponent {

  @Input()
  breadcrumbs: LaxBreadcrumbOption[] = [];

}
