import { fallbackLanguage } from 'app/app.config';
import * as fromActions from '../actions/core.actions';

export interface State {
  language: string;
}

const defaultState: State = {
  language: fallbackLanguage,
};

export function reducer(state: State = defaultState, action: fromActions.CoreActions): State {
  switch (action.type) {
    case fromActions.CoreActionTypes.CHANGE_LANGUAGE:
    case fromActions.CoreActionTypes.LANGUAGE_DETECTED:
      return { language: action.payload };

    default:
      return state;
  }
}
