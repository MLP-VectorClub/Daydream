import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from 'app/store/actions/auth.actions';
import { FailsafeUser, Nullable, UnifiedErrorResponse } from 'app/types';

export interface State {
  signedIn: boolean;
  authLoading: boolean;
  loginError: Nullable<UnifiedErrorResponse>;
  logoutError: Nullable<UnifiedErrorResponse>;
  registerError: Nullable<UnifiedErrorResponse>;
  data: Nullable<FailsafeUser>;
}

const defaultState: State = {
  signedIn: false,
  authLoading: true,
  loginError: null,
  logoutError: null,
  registerError: null,
  data: null,
};

const guestUser: FailsafeUser = {
  id: null,
  name: null,
  displayName: null,
  email: null,
  role: 'guest',
  avatarUrl: null,
  avatarProvider: 'deviantart',
};

export function reducer(state: State = defaultState, action: fromActions.AuthActions): State {
  switch (action.type) {
    case fromActions.ActionTypes.CHECK_AUTH_SUCCESS:
      return { ...state, signedIn: true, data: action.payload };

    case fromActions.ActionTypes.LOGIN:
    case fromActions.ActionTypes.REGISTER:
      return { ...state, authLoading: true };

    case fromActions.ActionTypes.CHECK_AUTH_FAILURE:
    case fromActions.ActionTypes.LOGOUT_SUCCESS:
      return { ...state, authLoading: false, signedIn: false, data: guestUser };

    case fromActions.ActionTypes.LOGIN_SUCCESS:
    case fromActions.ActionTypes.REGISTER_SUCCESS:
      return { ...state, signedIn: true, data: action.payload };

    case fromActions.ActionTypes.LOGIN_FAILURE:
      return { ...state, authLoading: false, loginError: action.payload };

    case fromActions.ActionTypes.LOGOUT_FAILURE:
      return { ...state, authLoading: false, logoutError: action.payload };

    case fromActions.ActionTypes.REGISTER_FAILURE:
      return { ...state, authLoading: false, registerError: action.payload };

    default:
      return state;
  }
}

const authSelector = createFeatureSelector('auth');
export const signedIn = createSelector(authSelector, (state: State) => state.signedIn);
export const authLoading = createSelector(authSelector, (state: State) => state.authLoading);
export const loginError = createSelector(authSelector, (state: State) => state.loginError);
export const logoutError = createSelector(authSelector, (state: State) => state.logoutError);
export const registerError = createSelector(authSelector, (state: State) => state.registerError);
export const data = createSelector(authSelector, (state: State) => state.data);
