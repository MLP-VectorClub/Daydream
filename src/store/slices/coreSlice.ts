import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fallbackLanguage } from '../../config';
import { PageTitle, ValuesOf } from '../../types';

export interface CoreState {
  language: string;
  sidebarOpen: boolean;
  contactOpen: boolean;
  title: PageTitle;
  backendDown: boolean;
  upcomingEvents: object[];
  usefulLinks: object[];
}

const initialState: CoreState = {
  language: fallbackLanguage,
  sidebarOpen: false,
  contactOpen: false,
  title: null,
  backendDown: false,
  upcomingEvents: [],
  usefulLinks: [],
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
    toggleContact(state, action: PayloadAction<boolean | undefined>) {
      state.contactOpen = typeof action.payload === 'undefined' ? !state.contactOpen : action.payload;
    },
    setBackendDown(state, action: PayloadAction<boolean>) {
      state.backendDown = action.payload;
    },
  },
});

export type CoreActions = ValuesOf<typeof coreSlice.actions>;

export const coreActions = coreSlice.actions;

export default coreSlice.reducer;
