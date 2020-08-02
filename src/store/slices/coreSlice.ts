import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
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
    [HYDRATE](state, action: PayloadAction<{ core: CoreState }>) {
      return { ...state, ...action.payload.core };
    },
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

export const coreActions = coreSlice.actions;

export type CoreActions = ValuesOf<typeof coreActions>;

export default coreSlice.reducer;
