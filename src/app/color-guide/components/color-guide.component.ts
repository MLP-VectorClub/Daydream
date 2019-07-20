import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { GUIDE_PAGE_SIZES } from 'app/app.config';
import { sanitizeGuideName, sanitizePageParam, sanitizePageSizeParam, sanitizeSearchParam } from 'app/shared/utils';
import * as fromColorGuideActions from 'app/store/actions/color-guide.actions';
import { SetTitleAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import * as fromReducer from 'app/store/reducers/color-guide.reducer';
import { Appearance, LaxBreadcrumbOption, Nullable, PageData, QueryPublicAppearancesRequest, Status } from 'app/types';
import { omit } from 'lodash';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-color-guide',
  templateUrl: './color-guide.component.html',
})
export class ColorGuideComponent implements OnInit {

  appearances$: Observable<Appearance[]>;
  pagination$: Observable<PageData['pagination']>;
  status$: Observable<Status>;
  breadcrumbs$: Observable<LaxBreadcrumbOption[]>;
  guideName: string;

  private breadcrumbsSource = new BehaviorSubject<LaxBreadcrumbOption[]>(this.getBreadcrumbs(null));
  private skip = false;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private trans: TranslateService) {
    this.breadcrumbs$ = this.breadcrumbsSource.asObservable();
    this.appearances$ = this.store.pipe(select(fromReducer.appearances));
    this.pagination$ = this.store.pipe(select(fromReducer.pagination));
    this.status$ = this.store.pipe(select(fromReducer.status));

    // Appearance list already filled by the server
    this.appearances$.pipe(take(1), filter(items => items.length > 0)).subscribe(() => this.skip = true);
  }

  ngOnInit() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      map(([path, query]): QueryPublicAppearancesRequest => {
        const guide = sanitizeGuideName(path.guide);
        const page = sanitizePageParam(query.page);
        const q = sanitizeSearchParam(query.q);
        const size = sanitizePageSizeParam(GUIDE_PAGE_SIZES)(query.size);
        return { guide, page, q, size };
      }),
    ).subscribe(params => {
      this.guideName = this.trans.instant(`COLOR_GUIDE.GUIDE_NAMES.${params.guide.toUpperCase()}`);
      this.breadcrumbsSource.next(this.getBreadcrumbs(this.guideName));
      this.store.dispatch(new SetTitleAction(['COLOR_GUIDE_NAMED_PAGED', { guide: this.guideName, page: params.page }]));
      if (this.skip)
        this.skip = false;
      else this.store.dispatch(new fromColorGuideActions.LoadAppearancesAction(params));
    });
  }

  changePage(page: number) {
    const queryParams = omit({ ...this.route.snapshot.queryParams, page }, 'size');
    this.router.navigate(['.'], { relativeTo: this.route, queryParams });
  }

  changePageSize(size: number) {
    this.store.dispatch(new fromColorGuideActions.ChangePageSizeAction(size));
  }

  private getBreadcrumbs(guideName: Nullable<string>): LaxBreadcrumbOption[] {
    return [
      {
        url: null,
        label: 'TITLES.COLOR_GUIDE',
      },
      {
        url: null,
        label: guideName,
        current: true,
      },
    ];
  }
}
