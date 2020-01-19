import { Action } from '@ngrx/store';
import { QueryPublicAppearancesRequest, QueryPublicAppearancesResult } from 'app/types';

export enum ActionTypes {
  LOAD_APPEARANCES = '[COLOR GUIDE] Load Appearances',
  LOAD_APPEARANCES_SUCCESS = '[COLOR GUIDE] Load Appearances Success',
  LOAD_APPEARANCES_FAILURE = '[COLOR GUIDE] Load Appearances Failure',
}

export class LoadAppearancesAction implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES;

  constructor(public payload: QueryPublicAppearancesRequest) {
  }
}

export class LoadAppearancesSuccess implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES_SUCCESS;

  constructor(public payload: QueryPublicAppearancesResult) {
  }
}

export class LoadAppearancesFailure implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES_FAILURE;
}

export type ColorGuideActions =
  LoadAppearancesAction |
  LoadAppearancesSuccess |
  LoadAppearancesFailure;
