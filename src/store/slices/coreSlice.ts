import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fallbackLanguage } from '../../config';
import { PageTitle, ValuesOf } from '../../types';

export interface CoreState {
  language: string;
  sidebarOpen: boolean;
  title: PageTitle;
}

const initialState: CoreState = {
  language: fallbackLanguage,
  sidebarOpen: false,
  title: null,
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    toggleSidebar(state, action: PayloadAction<boolean | undefined>) {
      state.sidebarOpen = typeof action.payload === 'undefined' ? !state.sidebarOpen : action.payload;
    },
    setTitle: (state, action: PayloadAction<CoreState['title']>) => {
      state.title = action.payload;
    },
  },
});

export type CoreActions = ValuesOf<typeof coreSlice.actions>;

export const {
  setLanguage,
  toggleSidebar,
  setTitle,
} = coreSlice.actions;

export default coreSlice.reducer;
