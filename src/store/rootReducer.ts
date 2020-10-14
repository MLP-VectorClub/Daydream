import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import coreReducer, { CoreState } from 'src/store/slices/coreSlice';
import authReducer, { AuthState } from 'src/store/slices/authSlice';
import profileReducer, { ProfileState } from 'src/store/slices/profileSlice';

export interface RootState {
  core: CoreState;
  auth: AuthState;
  profile: ProfileState;
}

const appReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  profile: profileReducer,
});

export const rootReducer = (...args: Parameters<typeof appReducer>): ReturnType<typeof appReducer> => {
  if (args[1].type === HYDRATE) return { ...args[0], ...(args[1].payload as RootState) };

  return appReducer(...args);
};
