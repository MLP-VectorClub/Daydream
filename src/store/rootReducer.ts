import { combineReducers } from '@reduxjs/toolkit';
import coreReducer, { CoreState } from 'src/store/slices/coreSlice';
import authReducer, { AuthState } from 'src/store/slices/authSlice';
import profileReducer, { ProfileState } from 'src/store/slices/profileSlice';

export interface RootState {
  core: CoreState;
  auth: AuthState;
  profile: ProfileState;
}

export const rootReducer = combineReducers<RootState>({
  core: coreReducer,
  auth: authReducer,
  profile: profileReducer,
});
