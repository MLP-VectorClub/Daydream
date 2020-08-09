import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import {
  AuthModalSide,
  FailsafeUser,
  Nullable,
  PostUsersRequest,
  PostUsersSigninRequest,
  Status,
  UnifiedErrorResponse,
  User,
  ValuesOf,
} from '../../types';

export interface AuthState {
  signIn: {
    status: Status;
    error: Nullable<UnifiedErrorResponse>;
  };
  signOut: {
    status: Status;
    error: Nullable<UnifiedErrorResponse>;
  };
  register: {
    status: Status;
    error: Nullable<UnifiedErrorResponse>;
  };
  registerOauth: {
    status: Status;
    error: Nullable<UnifiedErrorResponse>;
  };
  authModal: {
    open: boolean;
    side: AuthModalSide;
  };
  notifications: object[];
}

const initialState: AuthState = {
  signIn: {
    status: Status.INIT,
    error: null,
  },
  signOut: {
    status: Status.INIT,
    error: null,
  },
  register: {
    status: Status.INIT,
    error: null,
  },
  registerOauth: {
    status: Status.INIT,
    error: null,
  },
  authModal: {
    open: false,
    side: AuthModalSide.SIGN_IN,
  },
  notifications: [],
};

const clearModalState = (state: typeof initialState) => {
  state.authModal.open = false;
  state.signIn = { ...initialState.signIn };
  state.signOut = { ...initialState.signOut };
  state.register = { ...initialState.register };
};

const afterAuthChange = (state: typeof initialState, user?: FailsafeUser) => {
  if (user) {
    clearModalState(state);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [HYDRATE](state, action: PayloadAction<{ auth: AuthState }>) {
      return { ...state, ...action.payload.auth };
    },
    signIn(state, _action: PayloadAction<PostUsersSigninRequest>) {
      state.signIn.status = Status.LOAD;
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.signIn.status = Status.SUCCESS;
      afterAuthChange(state, action.payload);
    },
    signInFailure(state, action: PayloadAction<UnifiedErrorResponse>) {
      state.signIn.status = Status.FAILURE;
      state.signIn.error = action.payload;
    },
    signOut(state, _action: PayloadAction) {
      state.signOut.status = Status.LOAD;
    },
    signOutSuccess(state, _action: PayloadAction) {
      state.signOut.status = Status.SUCCESS;
      afterAuthChange(state);
    },
    signOutFailure(state, action: PayloadAction<UnifiedErrorResponse>) {
      state.signOut.status = Status.FAILURE;
      state.signOut.error = action.payload;
    },
    register(state, _action: PayloadAction<PostUsersRequest>) {
      state.register.status = Status.LOAD;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.register.status = Status.SUCCESS;
      afterAuthChange(state, action.payload);
    },
    registerFailure(state, action: PayloadAction<UnifiedErrorResponse>) {
      state.register.status = Status.FAILURE;
      state.register.error = action.payload;
    },
    openAuthModal(state, action: PayloadAction<Nullable<AuthModalSide>>) {
      state.authModal.open = true;
      state.authModal.side = action.payload || AuthModalSide.SIGN_IN;
    },
    closeAuthModal(state, _action: PayloadAction) {
      clearModalState(state);
    },
  },
});

export const authActions = authSlice.actions;

export type AuthActions = ValuesOf<typeof authActions>;

export default authSlice.reducer;
