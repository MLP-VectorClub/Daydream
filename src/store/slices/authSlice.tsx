import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthModalSide,
  FailsafeUser,
  LoginRequest,
  Nullable,
  RegistrationRequest,
  Status,
  UnifiedErrorResponse,
  User, ValuesOf,
} from '../../types';

export interface AuthState {
  signedIn: boolean;
  authCheck: {
    status: Status;
  };
  login: {
    status: Status;
    error: Nullable<UnifiedErrorResponse>;
  };
  logout: {
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
}

const guestUser: FailsafeUser = {
  id: null,
  name: null,
  displayName: null,
  email: null,
  role: 'guest',
  avatarUrl: null,
  avatarProvider: 'deviantart',
};

const initialState: AuthState = {
  signedIn: false,
  authCheck: {
    status: Status.INIT,
  },
  login: {
    status: Status.INIT,
    error: null,
  },
  logout: {
    status: Status.INIT,
    error: null,
  },
  register: {
    status: Status.INIT,
    error: null,
  },
  authModal: {
    open: false,
    side: AuthModalSide.LOGIN,
  },
  user: guestUser,
};

const afterAuthChange = (state: typeof initialState, user?: FailsafeUser) => {
  if (user) {
    state.signedIn = true;
    state.user = user;
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
    login(state, _action: PayloadAction<LoginRequest>) {
      state.login.status = Status.LOAD;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.login.status = Status.SUCCESS;
      afterAuthChange(state, action.payload);
    },
    loginFailure(state, action: PayloadAction<UnifiedErrorResponse>) {
      state.login.status = Status.FAILURE;
      state.login.error = action.payload;
    },
    logout(state, _action: PayloadAction) {
      state.logout.status = Status.LOAD;
    },
    logoutSuccess(state, _action: PayloadAction) {
      state.logout.status = Status.SUCCESS;
      afterAuthChange(state);
    },
    logoutFailure(state, action: PayloadAction<UnifiedErrorResponse>) {
      state.logout.status = Status.FAILURE;
      state.logout.error = action.payload;
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
    openAuthModal(state, action: PayloadAction<AuthModalSide>) {
      state.authModal.open = true;
      state.authModal.side = action.payload;
    },
    closeAuthModal(state, _action: PayloadAction) {
      state.authModal.open = false;
    },
  },
});

export type AuthActions = ValuesOf<typeof authSlice.actions>;

export const {
  checkAuth,
  checkAuthSuccess,
  checkAuthFailure,
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  register,
  registerSuccess,
  registerFailure,
  openAuthModal,
  closeAuthModal,
} = authSlice.actions;

export default authSlice.reducer;
