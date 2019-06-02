import { Action } from '@ngrx/store';
import { GetAllAppearancesRequest, GetAllAppearancesResult } from 'app/types';

export enum ActionTypes {
  LOAD_APPEARANCES = '[COLOR GUIDE] Load Appearances',
  LOAD_APPEARANCES_YAY = '[COLOR GUIDE] Load Appearances Yay',
  LOAD_APPEARANCES_NAY = '[COLOR GUIDE] Load Appearances Nay',
}

export class LoadAppearancesAction implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES;

  constructor(public payload: GetAllAppearancesRequest) {
  }
}

export class LoadAppearancesYay implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES_YAY;

  constructor(public payload: GetAllAppearancesResult) {
  }
}

export class LoadAppearancesNay implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES_NAY;
}

export type ColorGuideActions =
  LoadAppearancesAction |
  LoadAppearancesYay |
  LoadAppearancesNay;
