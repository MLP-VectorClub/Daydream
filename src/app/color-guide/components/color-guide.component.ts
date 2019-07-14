import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { sanitizeGuideName, sanitizePageParam, sanitizeSearchParam } from 'app/shared/utils';
import * as fromColorGuideActions from 'app/store/actions/color-guide.actions';
import { SetTitleAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import * as fromReducer from 'app/store/reducers/color-guide.reducer';
import { Appearance, Nullable, PageData, QueryPublicAppearancesRequest, Status } from 'app/types';
import { LaxBreadcrumbOption } from 'app/types/ng-zorro';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute,
              private router: Router,
              private trans: TranslateService) {
    this.breadcrumbs$ = this.breadcrumbsSource.asObservable();
    this.appearances$ = this.store.pipe(select(fromReducer.appearances));
    this.pagination$ = this.store.pipe(select(fromReducer.pagination));
    this.status$ = this.store.pipe(select(fromReducer.status));

    combineLatest(
      this.route.params,
      this.route.queryParams,
    ).pipe(
      map(([path, query]): QueryPublicAppearancesRequest => {
        const guide = sanitizeGuideName(path.guide);
        const page = sanitizePageParam(query.page);
        const q = sanitizeSearchParam(query.q);
        return { guide, page, q };
      }),
    ).subscribe(params => {
      this.guideName = this.trans.instant(`COLOR_GUIDE.GUIDE_NAMES.${params.guide.toUpperCase()}`);
      this.breadcrumbsSource.next(this.getBreadcrumbs(this.guideName));
      this.store.dispatch(new SetTitleAction(['COLOR_GUIDE_NAMED_PAGED', { guide: this.guideName, page: params.page }]));
      this.store.dispatch(new fromColorGuideActions.LoadAppearancesAction(params));
    });
  }

  ngOnInit() {
  }

  changePage(page: number) {
    const queryParams = { ...this.route.snapshot.queryParams, page };
    this.router.navigate(['.'], { relativeTo: this.route, queryParams });
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
