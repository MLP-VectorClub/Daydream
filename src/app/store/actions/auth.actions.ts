import { Action } from '@ngrx/store';
import { User } from 'app/types';

export enum ActionTypes {
  CHECK_AUTH = '[AUTH] Check Auth',
  CHECK_AUTH_SUCCESS = '[AUTH] Check Auth Success',
  CHECK_AUTH_FAILURE = '[AUTH] Check Auth Failure',
  LOGOUT = '[AUTH] Logout',
  LOGOUT_SUCCESS = '[AUTH] Logout Success',
  LOGOUT_FAILURE = '[AUTH] Logout Failure',
}

export class CheckAuthAction implements Action {
  readonly type = ActionTypes.CHECK_AUTH;
}

export class CheckAuthSuccess implements Action {
  readonly type = ActionTypes.CHECK_AUTH_SUCCESS;

  constructor(public payload: User) {
  }
}

export class CheckAuthFailure implements Action {
  readonly type = ActionTypes.CHECK_AUTH_FAILURE;
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class LogoutSuccess implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
}

export class LogoutFailure implements Action {
  readonly type = ActionTypes.LOGOUT_FAILURE;
}

export type AuthActions =
  CheckAuthAction |
  CheckAuthSuccess |
  CheckAuthFailure |
  LogoutAction |
  LogoutSuccess |
  LogoutFailure;
