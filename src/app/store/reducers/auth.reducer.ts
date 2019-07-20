import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from 'app/store/actions/auth.actions';
import { Nullable, NullableUser } from 'app/types';

export interface State {
  signedIn: boolean;
  data: Nullable<NullableUser>;
}

const defaultState: State = {
  signedIn: false,
  data: null,
};

const guestUser: NullableUser = {
  id: null,
  name: null,
  role: 'guest',
  avatarUrl: null,
  avatarProvider: 'deviantart',
};

export function reducer(state: State = defaultState, action: fromActions.AuthActions): State {
  switch (action.type) {
    case fromActions.ActionTypes.CHECK_AUTH_YAY:
      return { signedIn: true, data: action.payload };

    case fromActions.ActionTypes.CHECK_AUTH_NAY:
      return { signedIn: false, data: guestUser };

    default:
      return state;
  }
}

const authSelector = createFeatureSelector('auth');
export const signedIn = createSelector(authSelector, (state: State) => state.signedIn);
export const data = createSelector(authSelector, (state: State) => state.data);
