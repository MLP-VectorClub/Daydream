import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fallbackLanguage } from 'app/app.config';
import * as fromActions from '../actions/core.actions';

export interface State {
  language: string;
  sidebarCollapsed: boolean;
}

const defaultState: State = {
  language: fallbackLanguage,
  sidebarCollapsed: false,
};

export function reducer(state: State = defaultState, action: fromActions.CoreActions): State {
  switch (action.type) {
    case fromActions.ActionTypes.CHANGE_LANGUAGE:
    case fromActions.ActionTypes.LANGUAGE_DETECTED:
      return { ...state, language: action.payload };

    case fromActions.ActionTypes.TOGGLE_SIDEBAR: {
      const newValue = action.payload === null ? !state.sidebarCollapsed : action.payload;
      return { ...state, sidebarCollapsed: newValue };
    }

    default:
      return state;
  }
}

const coreSelector = createFeatureSelector('core');
export const language = createSelector(coreSelector, (state: State) => state.language);
export const sidebarCollapsed = createSelector(coreSelector, (state: State) => state.sidebarCollapsed);
