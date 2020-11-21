import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { BreadcrumbEntry, PageTitle, ValuesOf } from 'src/types';
import { omit } from 'lodash';
import { renderingStateSlice } from 'src/utils/store';

export interface CoreSliceMirroredState {
  breadcrumbs: BreadcrumbEntry[];
  title: PageTitle;
}

const initialMirroredState: CoreSliceMirroredState = {
  breadcrumbs: [],
  title: null,
};

export interface CoreState {
  sidebarOpen: boolean;
  contactOpen: boolean;
  colorAvgOpen: boolean;
  upcomingEvents: Record<string, unknown>[];
  client: CoreSliceMirroredState;
  server: CoreSliceMirroredState;
}

const initialState: CoreState = {
  sidebarOpen: false,
  contactOpen: false,
  colorAvgOpen: false,
  upcomingEvents: [],
  client: initialMirroredState,
  server: initialMirroredState,
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    toggleSidebar(state: CoreState, action: PayloadAction<boolean | undefined>) {
      state.sidebarOpen = typeof action.payload === 'undefined' ? !state.sidebarOpen : action.payload;
    },
    toggleContact(state: CoreState, action: PayloadAction<boolean | undefined>) {
      state.contactOpen = typeof action.payload === 'undefined' ? !state.contactOpen : action.payload;
    },
    toggleColorAvg(state: CoreState, action: PayloadAction<boolean | undefined>) {
      state.colorAvgOpen = typeof action.payload === 'undefined' ? !state.colorAvgOpen : action.payload;
    },
    setTitle(state: CoreState, action: PayloadAction<CoreSliceMirroredState['title']>) {
      renderingStateSlice(state).title = action.payload;
    },
    resetTitle(state: CoreState, _action: PayloadAction) {
      renderingStateSlice(state).title = renderingStateSlice(initialState).title;
    },
    setBreadcrumbs(state: CoreState, action: PayloadAction<CoreSliceMirroredState['breadcrumbs']>) {
      renderingStateSlice(state).breadcrumbs = action.payload;
    },
    resetBreadcrumbs(state: CoreState, _action: PayloadAction) {
      renderingStateSlice(state).breadcrumbs = renderingStateSlice(initialState).breadcrumbs;
    },
  },
  extraReducers: {
    [HYDRATE](state: CoreState, action: PayloadAction<{ core: CoreState }>) {
      // Do not overwrite client side properties
      return { ...state, ...omit(action.payload.core, 'client') };
    },
  },
});

export const coreActions = coreSlice.actions;

export type CoreActions = ValuesOf<typeof coreActions>;

export default coreSlice.reducer;
