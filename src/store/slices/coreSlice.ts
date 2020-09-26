import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { PageTitle, ValuesOf } from 'src/types';

export interface CoreState {
  sidebarOpen: boolean;
  contactOpen: boolean;
  colorAvgOpen: boolean;
  title: PageTitle;
  upcomingEvents: object[];
}

const initialState: CoreState = {
  sidebarOpen: false,
  contactOpen: false,
  colorAvgOpen: false,
  title: null,
  upcomingEvents: [],
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
    toggleColorAvg(state, action: PayloadAction<boolean | undefined>) {
      state.colorAvgOpen = typeof action.payload === 'undefined' ? !state.colorAvgOpen : action.payload;
    },
  },
});

export const coreActions = coreSlice.actions;

export type CoreActions = ValuesOf<typeof coreActions>;

export default coreSlice.reducer;
