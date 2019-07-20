import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromCoreActions from 'app/store/actions/core.actions';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import * as fromColorGuideReducer from 'app/store/reducers/color-guide.reducer';
import * as fromCoreReducer from 'app/store/reducers/core.reducer';

export interface AppState {
  auth: fromAuthReducer.State;
  core: fromCoreReducer.State;
  'color-guide': fromColorGuideReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuthReducer.reducer,
  core: fromCoreReducer.reducer,
  'color-guide': fromColorGuideReducer.reducer,
};

export function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any) => {
    if (action.type === fromCoreActions.ActionTypes.SET_ROOT_STATE)
      return action.payload;
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [stateSetter];
