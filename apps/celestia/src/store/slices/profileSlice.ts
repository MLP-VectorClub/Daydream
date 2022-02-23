import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileState {}

const initialState: ProfileState = {};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    [HYDRATE](state, action: PayloadAction<{ profile: ProfileState }>) {
      return { ...state, ...action.payload.profile };
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
