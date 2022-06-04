import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { AuthModalSide, FailsafeUser, Nullable, Status, UnifiedErrorResponse } from 'src/types';
import { User } from '@mlp-vectorclub/api-types';
import { registerThunk, signInThunk, signOutThunk } from 'src/store/thunks';

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
  notifications: Record<string, unknown>[];
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
    openAuthModal(state, action: PayloadAction<Nullable<AuthModalSide>>) {
      state.authModal.open = true;
      state.authModal.side = action.payload || AuthModalSide.SIGN_IN;
    },
    closeAuthModal(state, _action: PayloadAction) {
      clearModalState(state);
    },
  },
  extraReducers: {
    [HYDRATE](state, action: PayloadAction<{ auth: AuthState }>) {
      return { ...state, ...action.payload.auth };
    },
    [signInThunk.pending.type](state, _action: PayloadAction) {
      state.signIn.status = Status.LOAD;
    },
    [signInThunk.fulfilled.type](state, action: PayloadAction<User>) {
      state.signIn.status = Status.SUCCESS;
      afterAuthChange(state, action.payload);
    },
    [signInThunk.rejected.type](state, action: PayloadAction<UnifiedErrorResponse>) {
      state.signIn.status = Status.FAILURE;
      state.signIn.error = action.payload;
    },
    [signOutThunk.pending.type](state, _action: PayloadAction) {
      state.signOut.status = Status.LOAD;
    },
    [signOutThunk.fulfilled.type](state, _action: PayloadAction) {
      state.signOut.status = Status.SUCCESS;
      afterAuthChange(state);
    },
    [signOutThunk.rejected.type](state, action: PayloadAction<UnifiedErrorResponse>) {
      state.signOut.status = Status.FAILURE;
      state.signOut.error = action.payload;
    },
    [registerThunk.pending.type](state, _action: PayloadAction) {
      state.register.status = Status.LOAD;
    },
    [registerThunk.fulfilled.type](state, action: PayloadAction<User>) {
      state.register.status = Status.SUCCESS;
      afterAuthChange(state, action.payload);
    },
    [registerThunk.rejected.type](state, action: PayloadAction<void, string, never, UnifiedErrorResponse>) {
      state.register.status = Status.FAILURE;
      state.register.error = action.error;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
