import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from 'app/store/actions/auth.actions';
import { Nullable, User } from 'app/types';

export interface State {
  signedIn: Nullable<boolean>;
  data: Nullable<User>;
}

const defaultState: State = {
  signedIn: null,
  data: null,
};

export const reducer = (state: State = defaultState, action: fromActions.AuthActions) => {
  switch (action.type) {
    case fromActions.AuthActionTypes.CHECK_AUTH_YAY:
      return { signedIn: true, data: action.payload };

    case fromActions.AuthActionTypes.CHECK_AUTH_NAY:
      return { ...defaultState, signedIn: false };

    default:
      return state;
  }
};

const authSelector = createFeatureSelector('auth');
export const authSignedIn = createSelector(authSelector, (state: State) => state.signedIn);
export const authData = createSelector(authSelector, (state: State) => state.data);
