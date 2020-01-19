import { Component, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as config from 'app/app.config';
import { ToggleSidebarAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import { sidebarCollapsed } from 'app/store/reducers/core.reducer';
import { AppUser, Nullable } from 'app/types';
import { Observable } from 'rxjs';
import { LogoutAction } from '../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  sidebarCollapsed$: Observable<boolean>;
  user$: Observable<Nullable<AppUser>>;
  signedIn$: Observable<boolean>;
  isNavCollapsed = true;
  isAccountMenuCollapsed = true;

  c = config;

  constructor(private store: Store<AppState>) {
    this.sidebarCollapsed$ = this.store.pipe(select(sidebarCollapsed));
    this.user$ = this.store.pipe(select(fromAuthReducer.data));
    this.signedIn$ = this.store.pipe(select(fromAuthReducer.signedIn));
  }

  toggleSidebar() {
    this.store.dispatch(new ToggleSidebarAction(null));
  }

  toggleAccountMenu() {
    this.isAccountMenuCollapsed = !this.isAccountMenuCollapsed;
    if (!this.isNavCollapsed)
      this.isNavCollapsed = true;
  }

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
    if (!this.isAccountMenuCollapsed)
      this.isAccountMenuCollapsed = true;
  }

  toggleNavs(collapsed: boolean) {
    this.isNavCollapsed = collapsed;
    this.isAccountMenuCollapsed = collapsed;
  }

  logout() {
    this.toggleNavs(true);

    this.store.dispatch(new LogoutAction());
  }
}
