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

const rootReducer = (state: RootState, action: ReturnType<ActionsType>) => {
  if (action.type === HYDRATE) return { ...state, ...(action.payload as RootState) };

  return appReducer(state, action);
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

export default rootReducer;
