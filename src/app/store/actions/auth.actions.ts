import { Action } from '@ngrx/store';
import { User } from 'app/types';

export enum ActionTypes {
  CHECK_AUTH = '[AUTH] Check Auth',
  CHECK_AUTH_YAY = '[AUTH] Check Auth Yay',
  CHECK_AUTH_NAY = '[AUTH] Check Auth Nay',
}

export class CheckAuthAction implements Action {
  readonly type = ActionTypes.CHECK_AUTH;
}

export class CheckAuthYay implements Action {
  readonly type = ActionTypes.CHECK_AUTH_YAY;

  constructor(public payload: User) {
  }
}

export class CheckAuthNay implements Action {
  readonly type = ActionTypes.CHECK_AUTH_NAY;
}

export type AuthActions =
  CheckAuthAction |
  CheckAuthYay |
  CheckAuthNay;
