import { Action } from '@ngrx/store';
import { Nullable } from 'app/types';

export enum ActionTypes {
  SET_ROOT_STATE = '[CORE] Set Root State',
  SET_TITLE = '[CORE] Set Title',
  TITLE_TRANSLATED = '[CORE] Title translated',
  DETECT_LANGUAGE = '[CORE] Detect Language',
  LANGUAGE_DETECTED = '[CORE] Language Detected',
  CHANGE_LANGUAGE = '[CORE] Change Language',
  TOGGLE_SIDEBAR = '[CORE] Toggle Sidebar',
}

type TitleKeyWithParams = [string, { [key: string]: any }];
export type SetTitleActionPayload = string | TitleKeyWithParams;

export class DetectLanguageAction implements Action {
  readonly type = ActionTypes.DETECT_LANGUAGE;
}

export class LanguageDetectedAction implements Action {
  readonly type = ActionTypes.LANGUAGE_DETECTED;

  constructor(public payload: string) {
  }
}

export class ChangeLanguageAction implements Action {
  readonly type = ActionTypes.CHANGE_LANGUAGE;

  constructor(public payload: string) {
  }
}

export class SetTitleAction implements Action {
  readonly type = ActionTypes.SET_TITLE;

  constructor(public payload: SetTitleActionPayload) {
  }
}

export class TitleTranslatedAction implements Action {
  readonly type = ActionTypes.TITLE_TRANSLATED;

  constructor(public payload: string) {
  }
}

export class ToggleSidebarAction implements Action {
  readonly type = ActionTypes.TOGGLE_SIDEBAR;

  constructor(public payload: Nullable<boolean>) {
  }
}

export class SetRootStateAction implements Action {
  readonly type = ActionTypes.SET_ROOT_STATE;

  constructor(public payload: any) {
  }
}

export type CoreActions =
  DetectLanguageAction |
  LanguageDetectedAction |
  ChangeLanguageAction |
  SetTitleAction |
  TitleTranslatedAction |
  ToggleSidebarAction |
  SetRootStateAction;
