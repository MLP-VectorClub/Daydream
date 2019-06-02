import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageData, Status } from 'app/types';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {

  @Input()
  data: PageData['pagination'];

  @Input()
  status: Status = Status.INIT;

  @Output()
  goto = new EventEmitter<number>();

  s = Status;

  pageChange(page: number) {
    this.goto.emit(page);
  }

}
