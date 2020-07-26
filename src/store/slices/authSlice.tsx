import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  AuthModalSide,
  FailsafeUser,
  LoginRequest,
  Nullable,
  RegistrationRequest,
  Status,
  UnifiedErrorResponse,
  User,
  ValuesOf,
} from '../../types';

export interface AuthState {
  signedIn: boolean;
  sessionUpdating: boolean;
  authCheck: {
    status: Status;
  };
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
  authModal: {
    open: boolean;
    side: AuthModalSide;
  };
  user: FailsafeUser;
  notifications: object[];
}

const guestUser: FailsafeUser = {
  id: null,
  name: null,
  email: null,
  role: null,
  avatarUrl: null,
  avatarProvider: 'gravatar',
};

const initialState: AuthState = {
  signedIn: false,
  sessionUpdating: false,
  authCheck: {
    status: Status.LOAD,
  },
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
  authModal: {
    open: false,
    side: AuthModalSide.SIGN_IN,
  },
  user: guestUser,
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
    state.signedIn = true;
    state.user = user;
    clearModalState(state);
  } else {
    state.signedIn = false;
    state.user = guestUser;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuth: (state, _action: PayloadAction) => {
      state.authCheck.status = Status.LOAD;
    },
    checkAuthSuccess(state, action: PayloadAction<User>) {
      state.authCheck.status = Status.SUCCESS;
      afterAuthChange(state, action.payload);
    },
    checkAuthFailure: (state, _action: PayloadAction<UnifiedErrorResponse>) => {
      state.authCheck.status = Status.FAILURE;
      afterAuthChange(state);
    },
    signIn(state, _action: PayloadAction<LoginRequest>) {
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
    register(state, _action: PayloadAction<RegistrationRequest>) {
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
      if (action.payload === null && state.authModal.side === null) {
        state.authModal.side = AuthModalSide.SIGN_IN;
      } else if (action.payload !== null) {
        state.authModal.side = action.payload;
      }
    },
    closeAuthModal(state, _action: PayloadAction) {
      clearModalState(state);
    },
    setSessionUpdating(state, action: PayloadAction<boolean>) {
      state.sessionUpdating = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export type AuthActions = ValuesOf<typeof authActions>;

export default authSlice.reducer;
