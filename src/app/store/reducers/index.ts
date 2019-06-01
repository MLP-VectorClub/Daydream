import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromAuthReducer from 'app/store/reducers/auth.reducer';
import * as fromCoreReducer from 'app/store/reducers/core.reducer';
import { environment } from 'src/environments/environment';

export interface AppState {
  auth: fromAuthReducer.State;
  core: fromCoreReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuthReducer.reducer,
  core: fromCoreReducer.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
