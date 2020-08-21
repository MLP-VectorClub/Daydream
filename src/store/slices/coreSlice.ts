import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { PageTitle, ValuesOf } from '../../types';

export interface CoreState {
  sidebarOpen: boolean;
  contactOpen: boolean;
  title: PageTitle;
  upcomingEvents: object[];
  usefulLinks: object[];
}

const initialState: CoreState = {
  sidebarOpen: false,
  contactOpen: false,
  title: null,
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
    toggleSidebar(state, action: PayloadAction<boolean | undefined>) {
      state.sidebarOpen = typeof action.payload === 'undefined' ? !state.sidebarOpen : action.payload;
    },
    setTitle: (state, action: PayloadAction<CoreState['title']>) => {
      state.title = action.payload;
    },
    toggleContact(state, action: PayloadAction<boolean | undefined>) {
      state.contactOpen = typeof action.payload === 'undefined' ? !state.contactOpen : action.payload;
    },
  },
});

export const coreActions = coreSlice.actions;

export type CoreActions = ValuesOf<typeof coreActions>;

export default coreSlice.reducer;
