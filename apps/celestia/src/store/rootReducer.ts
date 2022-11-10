import { combineReducers } from '@reduxjs/toolkit';
import coreReducer from 'src/store/slices/coreSlice';
import authReducer from 'src/store/slices/authSlice';
import profileReducer from 'src/store/slices/profileSlice';

export const rootReducer = combineReducers({
  core: coreReducer,
  auth: authReducer,
  profile: profileReducer,
});
