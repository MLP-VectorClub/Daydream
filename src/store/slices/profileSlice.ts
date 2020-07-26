import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  Nullable,
  PublicUser,
  ValuesOf,
} from '../../types';

export interface ProfileState {
  user: Nullable<PublicUser>;
}

const initialState: ProfileState = {
  user: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<Nullable<PublicUser>>) {
      state.user = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export type ProfileActions = ValuesOf<typeof profileActions>;

export default profileSlice.reducer;
