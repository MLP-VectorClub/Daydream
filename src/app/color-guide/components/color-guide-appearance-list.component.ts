import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Appearance, PageData, Status } from 'app/types';
import { GUIDE_PAGE_SIZES } from 'app/app.config';

@Component({
  selector: 'app-color-guide-appearance-list',
  templateUrl: './color-guide-appearance-list.component.html',
  styleUrls: ['./color-guide-appearance-list.component.scss'],
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

  @Output()
  changePageSize = new EventEmitter<number>();

  s = Status;
  gps = GUIDE_PAGE_SIZES;

}
