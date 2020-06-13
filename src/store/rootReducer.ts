import { combineReducers } from '@reduxjs/toolkit';
import coreReducer, { CoreActions } from './slices/coreSlice';
import authReducer, { AuthActions } from './slices/authSlice';
import profileReducer, { ProfileActions } from './slices/profileSlice';

const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  profile: profileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType =
  CoreActions
  | AuthActions
  | ProfileActions;

export default rootReducer;
