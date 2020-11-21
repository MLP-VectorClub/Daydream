import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ValuesOf } from 'src/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ProfileState {
}

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

export type ProfileActions = ValuesOf<typeof profileActions>;

export default profileSlice.reducer;
