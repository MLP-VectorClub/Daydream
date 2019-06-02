import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as fromActions from 'app/store/actions/color-guide.actions';
import { Appearance, PageData, Status } from 'app/types';

export interface State extends EntityState<Appearance>, PageData {
  status: Status;
}

export const adapter: EntityAdapter<Appearance> = createEntityAdapter<Appearance>();

const defaultState: State = adapter.getInitialState({
  status: Status.INIT,
  pagination: null,
});

export const reducer = (state: State = defaultState, action: fromActions.ColorGuideActions) => {
  switch (action.type) {
    case fromActions.ActionTypes.LOAD_APPEARANCES_YAY:
      return adapter.addAll(action.payload.appearances, { ...state, status: Status.YAY, pagination: action.payload.pagination });

    case fromActions.ActionTypes.LOAD_APPEARANCES_NAY:
      return adapter.removeAll({ ...state, status: Status.NAY });


    default:
      return state;
  }
};
