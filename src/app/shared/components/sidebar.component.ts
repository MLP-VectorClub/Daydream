import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as config from 'app/app.config';
import { ToggleSidebarAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import * as fromCoreReducer from 'app/store/reducers/core.reducer';
import { AppUser, Nullable } from 'app/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  user$: Observable<Nullable<AppUser>>;

  c = config;

  private sidebarCollapsed: boolean;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(select(fromAuthReducer.data));
    this.store.pipe(select(fromCoreReducer.sidebarCollapsed)).subscribe(collapsed => {
      this.sidebarCollapsed = collapsed;
    });
  }

  get isCollapsed() {
    return this.sidebarCollapsed;
  }

  set isCollapsed(value: boolean) {
    this.store.dispatch(new ToggleSidebarAction(value));
  }

}
