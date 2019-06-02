import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as config from 'app/app.config';
import { ToggleSidebarAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import { sidebarCollapsed } from 'app/store/reducers/core.reducer';
import { NullableUser } from 'app/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  sidebarCollapsed$: Observable<boolean>;
  user$: Observable<NullableUser>;
  signedIn$: Observable<boolean>;

  c = config;

  constructor(private store: Store<AppState>) {
    this.sidebarCollapsed$ = this.store.pipe(select(sidebarCollapsed));
    this.user$ = this.store.pipe(select(fromAuthReducer.data));
    this.signedIn$ = this.store.pipe(select(fromAuthReducer.signedIn));
  }

  toggleSidebar() {
    this.store.dispatch(new ToggleSidebarAction(null));
  }
}
