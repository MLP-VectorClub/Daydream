import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActions from 'app/store/actions/color-guide.actions';
import { Appearance, Nullable, PageData, Status } from 'app/types';

export interface State extends EntityState<Appearance> {
  status: Status;
  pagination: Nullable<PageData['pagination']>;
}

export const adapter: EntityAdapter<Appearance> = createEntityAdapter<Appearance>();

const defaultState: State = adapter.getInitialState({
  status: Status.INIT,
  pagination: null,
});

export function reducer(state: State = defaultState, action: fromActions.ColorGuideActions): State {
  switch (action.type) {
    case fromActions.ActionTypes.LOAD_APPEARANCES:
      return { ...state, status: Status.LOAD };

    case fromActions.ActionTypes.LOAD_APPEARANCES_SUCCESS:
      return adapter.addAll(action.payload.appearances, { ...state, status: Status.SUCCESS, pagination: action.payload.pagination });

    case fromActions.ActionTypes.LOAD_APPEARANCES_FAILURE:
      return adapter.removeAll({ ...state, status: Status.FAILURE });

    default:
      return state;
  }
}

// get the selectors
const { selectAll } = adapter.getSelectors();

const colorGuideSelector = createFeatureSelector<State>('color-guide');
export const appearances = createSelector(colorGuideSelector, selectAll);
export const pagination = createSelector(colorGuideSelector, (state: State) => state.pagination);
export const status = createSelector(colorGuideSelector, (state: State) => state.status);
