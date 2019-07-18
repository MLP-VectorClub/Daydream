import { Action } from '@ngrx/store';
import { QueryPublicAppearancesRequest, QueryPublicAppearancesResult } from 'app/types';

export enum ActionTypes {
  LOAD_APPEARANCES = '[COLOR GUIDE] Load Appearances',
  LOAD_APPEARANCES_YAY = '[COLOR GUIDE] Load Appearances Yay',
  LOAD_APPEARANCES_NAY = '[COLOR GUIDE] Load Appearances Nay',
  CHANGE_PAGE_SIZE = '[COLOR GUIDE] Change Page Size',
  CHANGE_PAGE_SIZE_YAY = '[COLOR GUIDE] Change Page Size Yay',
  CHANGE_PAGE_SIZE_NAY = '[COLOR GUIDE] Change Page Size Nay',
}

export class LoadAppearancesAction implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES;

  constructor(public payload: QueryPublicAppearancesRequest) {
  }
}

export class LoadAppearancesYay implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES_YAY;

  constructor(public payload: QueryPublicAppearancesResult) {
  }
}

export class LoadAppearancesNay implements Action {
  readonly type = ActionTypes.LOAD_APPEARANCES_NAY;
}

export class ChangePageSizeAction implements Action {
  readonly type = ActionTypes.CHANGE_PAGE_SIZE;

  constructor(public payload: number) {
  }
}

export class ChangePageSizeActionYay implements Action {
  readonly type = ActionTypes.CHANGE_PAGE_SIZE_YAY;

  constructor(public payload: number) {
  }
}

export class ChangePageSizeActionNay implements Action {
  readonly type = ActionTypes.CHANGE_PAGE_SIZE_NAY;
}

export type ColorGuideActions =
  LoadAppearancesAction |
  LoadAppearancesYay |
  LoadAppearancesNay |
  ChangePageSizeAction |
  ChangePageSizeActionYay |
  ChangePageSizeActionNay;
