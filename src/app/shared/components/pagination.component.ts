import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { range } from 'app/shared/utils';
import { Nullable, ObjectOf, PageData, PaginationItem, Status } from 'app/types';
import { uniq } from 'lodash-es';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  data: PageData['pagination'];

  @Input()
  status: Status = Status.INIT;

  @Input()
  baseUrl = '';

  @Input()
  queryPrefix = '';

  @Input()
  context = 2;

  @Output()
  goto = new EventEmitter<number>();

  s = Status;
  routerEventsSub: Nullable<Subscription> = null;
  items: PaginationItem[] = [];
  jumpForm: FormGroup;
  lastPressedPage: Nullable<number>;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.jumpForm = this.fb.group({
      page: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.routerEventsSub = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
    ).subscribe(event => {
      this.baseUrl = event.url.replace(/\?.*$/, '');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { data } = changes;
    if (data && data.currentValue !== null)
      this.recalculateItems();
  }

  ngOnDestroy(): void {
    if (this.routerEventsSub) {
      this.routerEventsSub.unsubscribe();
      this.routerEventsSub = null;
    }
  }

  pageChange(page: number) {
    this.lastPressedPage = page;
    this.goto.emit(page);
  }

  displayPopover(value: boolean) {
    if (value)
      this.jumpForm.reset();
  }

  jumpSubmit() {
    this.lastPressedPage = null;
    this.goto.emit(this.jumpForm.value.page);
  }

  private recalculateItems() {
    this.items = [];

    if (this.data.currentPage === 1 && this.data.totalPages === 1)
      return;

    let previousPage = 0;

    if (this.data.totalPages < 7)
      for (let i = 1; i <= this.data.totalPages; i++)
        this.items.push(this.makeItem(i));
    else
      this.getPageNumbers().forEach(page => {
        if (page !== Math.min(previousPage + 1, this.data.totalPages)) {
          const diff = page - (previousPage + 1);
          let item: PaginationItem;
          if (diff > 1)
            item = { label: '\u{2026}', pageNumber: null };
          else item = this.makeItem(previousPage + 1);
          this.items.push(item);
        }
        previousPage = page;

        this.items.push(this.makeItem(page));
      });
  }

  private makeItem(page: number): PaginationItem {
    const current = page === this.data.currentPage;

    const item = { label: String(page), pageNumber: page };
    if (current)
      return item;

    return {
      ...item,
      queryParams: this.getPageQuery(page),
    };
  }

  private getPageNumbers() {
    if (this.data.totalPages === null)
      throw new Error('this.totalPages must be defined');

    return uniq([
      1,
      ...range(
        Math.max(this.data.currentPage - this.context, 1),
        Math.min(this.data.currentPage + this.context, this.data.totalPages),
      ),
      this.data.totalPages,
    ]);
  }

  private getPageQuery(page: Nullable<number> = null): ObjectOf<string> {
    const pageNumber = page || this.data.currentPage;
    if (pageNumber === 1)
      return {};

    return { [`${this.queryPrefix}page`]: String(pageNumber) };
  }

}
