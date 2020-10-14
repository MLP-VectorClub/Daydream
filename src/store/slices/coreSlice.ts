import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { BreadcrumbEntry, PageTitle, ValuesOf } from 'src/types';

export interface CoreState {
  sidebarOpen: boolean;
  contactOpen: boolean;
  colorAvgOpen: boolean;
  title: PageTitle;
  upcomingEvents: Record<string, unknown>[];
  breadcrumbs: BreadcrumbEntry[];
}

const initialState: CoreState = {
  sidebarOpen: false,
  contactOpen: false,
  colorAvgOpen: false,
  title: null,
  upcomingEvents: [],
  breadcrumbs: [],
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
    setTitle(state, action: PayloadAction<CoreState['title']>) {
      state.title = action.payload;
    },
    toggleContact(state, action: PayloadAction<boolean | undefined>) {
      state.contactOpen = typeof action.payload === 'undefined' ? !state.contactOpen : action.payload;
    },
    toggleColorAvg(state, action: PayloadAction<boolean | undefined>) {
      state.colorAvgOpen = typeof action.payload === 'undefined' ? !state.colorAvgOpen : action.payload;
    },
    setBreadcrumbs(state, action: PayloadAction<CoreState['breadcrumbs']>) {
      (state as CoreState).breadcrumbs = action.payload;
    },
    resetBreadcrumbs(state, _action: PayloadAction) {
      (state as CoreState).breadcrumbs = initialState.breadcrumbs;
    },
  },
});

export const coreActions = coreSlice.actions;

export type CoreActions = ValuesOf<typeof coreActions>;

export default coreSlice.reducer;
