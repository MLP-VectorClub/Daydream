import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { formatDistanceStrict } from 'date-fns';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
})
export class TimeComponent implements OnInit, OnDestroy {

  @Input()
  date: Date;

  timer: Subscription;
  display: string;

  ngOnInit() {
    this.updateDisplay();
    timer(10000).subscribe(() => this.updateDisplay());
  }

  ngOnDestroy() {
    this.timer.unsubscribe();
  }

  private updateDisplay() {
    this.display = formatDistanceStrict(this.date, new Date(), { addSuffix: true });
  }
}
