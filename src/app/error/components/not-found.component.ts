import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreadcrumbItem } from 'app/types';
import { Store } from '@ngrx/store';
import { AppState } from 'app/store/reducers';
import { SetTitleAction } from 'app/store/actions/core.actions';

@Component({
  selector: 'app-error',
  templateUrl: './not-found.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NotFoundComponent implements OnInit {

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

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new SetTitleAction('NOT_FOUND'));
  }

}
