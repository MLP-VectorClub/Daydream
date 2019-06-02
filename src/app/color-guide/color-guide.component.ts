import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { sanitizeGuideName, sanitizePageParam, sanitizeSearchParam } from 'app/shared/utils';
import * as fromColorGuideActions from 'app/store/actions/color-guide.actions';
import { SetTitleAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import { GetAllAppearancesRequest, GuideName } from 'app/types';
import * as capitalize from 'capitalize';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-color-guide',
  templateUrl: './color-guide.component.html',
})
export class ColorGuideComponent implements OnInit {

  appearances$: Observable<GuideName>;

  constructor(private store: Store<AppState>,
              private route: ActivatedRoute) {
    combineLatest(
      this.route.params,
      this.route.queryParams,
    ).pipe(
      map(([path, query]): GetAllAppearancesRequest => {
        const guide = sanitizeGuideName(path.guide);
        const page = sanitizePageParam(query.page);
        const q = sanitizeSearchParam(query.q);
        return { guide, page, q };
      }),
    ).subscribe(params => {
      this.store.dispatch(new SetTitleAction(['COLOR_GUIDE_NAMED_PAGED', { guide: capitalize(params.guide), page: params.page }]));
      this.store.dispatch(new fromColorGuideActions.LoadAppearancesAction(params));
    });
  }

  ngOnInit() {
  }

}
