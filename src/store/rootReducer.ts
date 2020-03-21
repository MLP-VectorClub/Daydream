import { combineReducers } from '@reduxjs/toolkit';
import coreReducer, { CoreActions } from './slices/coreSlice';
import authReducer, { AuthActions } from './slices/authSlice';

const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ActionsType =
  CoreActions
  | AuthActions;

export default rootReducer;
