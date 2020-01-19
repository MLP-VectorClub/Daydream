import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { GUIDE_PAGE_SIZES } from 'app/app.config';
import { Appearance, PageData, Status } from 'app/types';

@Component({
  selector: 'app-color-guide-appearance-list',
  templateUrl: './color-guide-appearance-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ColorGuideAppearanceListComponent {

  @Input()
  appearances: Appearance[];

  @Input()
  status: Status;

  @Input()
  pagination: PageData['pagination'];

  @Output()
  changePage = new EventEmitter<number>();

  s = Status;
  gps = GUIDE_PAGE_SIZES;

}
