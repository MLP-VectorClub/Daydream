import { Action } from '@ngrx/store';
import { User } from 'app/types';

export enum AuthActionTypes {
  CHECK_AUTH = '[AUTH] Check Auth',
  CHECK_AUTH_YAY = '[AUTH] Check Auth Yay',
  CHECK_AUTH_NAY = '[AUTH] Check Auth Nay',
}

export class CheckAuthAction implements Action {
  readonly type = AuthActionTypes.CHECK_AUTH;
}

export class CheckAuthSuccess implements Action {
  readonly type = AuthActionTypes.CHECK_AUTH_YAY;

  constructor(public payload: User) {
  }
}

export class CheckAuthFail implements Action {
  readonly type = AuthActionTypes.CHECK_AUTH_NAY;
}

export type AuthActions =
  CheckAuthAction |
  CheckAuthSuccess |
  CheckAuthFail;
