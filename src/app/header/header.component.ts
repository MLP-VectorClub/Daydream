import { Component, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as config from 'app/app.config';
import { ToggleSidebarAction } from 'app/store/actions/core.actions';
import { AppState } from 'app/store/reducers';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import { sidebarCollapsed } from 'app/store/reducers/core.reducer';
import { FailsafeUser, Nullable, UnifiedErrorResponse, UnifiedErrorResponseTypes } from 'app/types';
import { Observable } from 'rxjs';
import { LoginAction, LogoutAction, RegisterAction } from '../store/actions/auth.actions';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionBag } from 'app/shared/SubscriptionBag';
import { collectErrors } from 'app/shared/utils';
import { omit } from 'lodash-es';

type AuthOption = 'LOGIN' | 'REGISTER';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnDestroy {
  sidebarCollapsed$: Observable<boolean>;
  user$: Observable<Nullable<FailsafeUser>>;
  authLoading: boolean;
  loginError: Nullable<UnifiedErrorResponse>;
  registerError: Nullable<UnifiedErrorResponse>;
  signedIn: boolean;
  isNavCollapsed = true;
  isAccountMenuCollapsed = true;
  revealPassword = false;
  authOption: AuthOption;
  loginForm: FormGroup;
  registerForm: FormGroup;

  subs = new SubscriptionBag();

  c = config;
  uert = UnifiedErrorResponseTypes;

  @ViewChild('authModal', { static: true })
  authModal: NgbModal;

  authModalRef: Nullable<NgbModalRef> = null;

  constructor(private store: Store<AppState>,
              private modalService: NgbModal,
              private fb: FormBuilder) {
    this.sidebarCollapsed$ = this.store.pipe(select(sidebarCollapsed));
    this.user$ = this.store.pipe(select(fromAuthReducer.data));
    this.subs.push(this.store.pipe(select(fromAuthReducer.signedIn)).subscribe(value => {
      this.signedIn = value;
      if (this.signedIn && this.authModalRef !== null) {
        this.authModalRef.close();
        this.authModalRef = null;
      }
    }));
    this.subs.push(this.store.pipe(select(fromAuthReducer.authLoading)).subscribe(value => {
      this.authLoading = value;
    }));
    this.subs.push(this.store.pipe(select(fromAuthReducer.loginError)).subscribe(value => {
      this.loginError = value;
    }));
    this.subs.push(this.store.pipe(select(fromAuthReducer.registerError)).subscribe(value => {
      this.registerError = value;
    }));

    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });

    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
    }, { validators: this.passwordsMatch });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

  passwordsMatch(control: FormGroup) {
    const { password, passwordConfirm } = control.controls;
    if (password === null || passwordConfirm === null)
      throw new Error('Expected controls missing from form');

    if (password.value !== passwordConfirm.value)
      return { passwordMismatch: true };

    return null;
  }

  openAuthModal(e: Event, mode: AuthOption) {
    this.switchAuthModal(e, mode);
    this.authModalRef = this.modalService.open(this.authModal);
    this.authModalRef.result.finally(() => {
      this.revealPassword = false;
      this.loginForm.reset();
      this.registerForm.reset();
    });
  }

  login() {
    this.store.dispatch(new LoginAction(this.loginForm.value));
  }

  register() {
    this.store.dispatch(new RegisterAction(this.registerForm.value));
  }

  logout() {
    this.toggleNavs(true);

    this.store.dispatch(new LogoutAction());
  }

  switchAuthModal(e: Event, mode: AuthOption) {
    e.preventDefault();

    this.authOption = mode;
    this.revealPassword = false;
  }
}
