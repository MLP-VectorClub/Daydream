import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import coreReducer, { CoreActions, CoreState } from './slices/coreSlice';
import authReducer, { AuthActions, AuthState } from './slices/authSlice';
import profileReducer, { ProfileActions, ProfileState } from './slices/profileSlice';

const appReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  profile: profileReducer,
});

export const rootReducer = (...args: Parameters<typeof appReducer>): ReturnType<typeof appReducer> => {
  if (args[1].type === HYDRATE) return { ...args[0], ...(args[1].payload as RootState) };

  return appReducer(...args);
};

export interface RootState {
  core: CoreState;
  auth: AuthState;
  profile: ProfileState;
}

export type ActionsType =
  CoreActions
  | AuthActions
  | ProfileActions;
