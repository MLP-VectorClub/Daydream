import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { omit } from 'lodash';
import { renderingStateSlice } from 'src/utils/store';
import { PageTitle } from 'src/types/common';
import { BreadcrumbEntry } from 'src/types/core';

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
  client?: CoreSliceMirroredState;
  server: CoreSliceMirroredState;
}

const initialState: CoreState = {
  sidebarOpen: false,
  contactOpen: false,
  colorAvgOpen: false,
  upcomingEvents: [],
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
      // Copy server properties to client
      return {
        ...omit(action.payload.core, 'client'),
        client: state.client || action.payload.core.server,
      };
    },
  },
});

export const coreActions = coreSlice.actions;

export default coreSlice.reducer;
