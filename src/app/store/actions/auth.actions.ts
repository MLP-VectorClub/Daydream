import { Action } from '@ngrx/store';
import { PostUsersLoginRequest, PostUsersLoginResult, PostUsersRequest, UnifiedErrorResponse, User } from 'app/types';

export enum ActionTypes {
  CHECK_AUTH = '[AUTH] Check Auth',
  CHECK_AUTH_SUCCESS = '[AUTH] Check Auth Success',
  CHECK_AUTH_FAILURE = '[AUTH] Check Auth Failure',
  LOGIN = '[AUTH] Login',
  LOGIN_SUCCESS = '[AUTH] Login Success',
  LOGIN_FAILURE = '[AUTH] Login Failure',
  LOGOUT = '[AUTH] Logout',
  LOGOUT_SUCCESS = '[AUTH] Logout Success',
  LOGOUT_FAILURE = '[AUTH] Logout Failure',
  REGISTER = '[AUTH] Register',
  REGISTER_SUCCESS = '[AUTH] Register Success',
  REGISTER_FAILURE = '[AUTH] Register Failure',
}

export class CheckAuthAction implements Action {
  readonly type = ActionTypes.CHECK_AUTH;
}

export class CheckAuthSuccessAction implements Action {
  readonly type = ActionTypes.CHECK_AUTH_SUCCESS;

  constructor(public payload: User) {
  }
}

export class CheckAuthFailureAction implements Action {
  readonly type = ActionTypes.CHECK_AUTH_FAILURE;
}

export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;

  constructor(public payload: PostUsersLoginRequest) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: User) {
  }
}

export class LoginFailureAction implements Action {
  readonly type = ActionTypes.LOGIN_FAILURE;

  constructor(public payload: UnifiedErrorResponse) {
  }
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class LogoutSuccessAction implements Action {
  readonly type = ActionTypes.LOGOUT_SUCCESS;
}

export class LogoutFailureAction implements Action {
  readonly type = ActionTypes.LOGOUT_FAILURE;

  constructor(public payload: UnifiedErrorResponse) {
  }
}


export class RegisterAction implements Action {
  readonly type = ActionTypes.REGISTER;

  constructor(public payload: PostUsersRequest) {
  }
}

export class RegisterSuccessAction implements Action {
  readonly type = ActionTypes.REGISTER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class RegisterFailureAction implements Action {
  readonly type = ActionTypes.REGISTER_FAILURE;

  constructor(public payload: UnifiedErrorResponse) {
  }
}

export type AuthActions =
  CheckAuthAction |
  CheckAuthSuccessAction |
  CheckAuthFailureAction |
  LoginAction |
  LoginSuccessAction |
  LoginFailureAction |
  LogoutAction |
  LogoutSuccessAction |
  LogoutFailureAction |
  RegisterAction |
  RegisterSuccessAction |
  RegisterFailureAction;
