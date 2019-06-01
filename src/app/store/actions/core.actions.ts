import { Action } from '@ngrx/store';

export enum CoreActionTypes {
  SET_TITLE = '[CORE] Set Title',
  TITLE_TRANSLATED = '[CORE] Title translated',
  DETECT_LANGUAGE = '[CORE] Detect Language',
  LANGUAGE_DETECTED = '[CORE] Language Detected',
  CHANGE_LANGUAGE = '[CORE] Change Language',
}

type TitleKeyWithParams = [string, { [key: string]: any }];
export type SetTitleActionPayload = string | TitleKeyWithParams;

export class DetectLanguageAction implements Action {
  readonly type = CoreActionTypes.DETECT_LANGUAGE;
}

export class LanguageDetectedAction implements Action {
  readonly type = CoreActionTypes.LANGUAGE_DETECTED;

  constructor(public payload: string) {
  }
}

export class ChangeLanguageAction implements Action {
  readonly type = CoreActionTypes.CHANGE_LANGUAGE;

  constructor(public payload: string) {
  }
}

export class SetTitleAction implements Action {
  readonly type = CoreActionTypes.SET_TITLE;

  constructor(public payload: SetTitleActionPayload) {
  }
}

export class TitleTranslatedAction implements Action {
  readonly type = CoreActionTypes.TITLE_TRANSLATED;

  constructor(public payload: string) {
  }
}

export type CoreActions =
  DetectLanguageAction |
  LanguageDetectedAction |
  ChangeLanguageAction |
  SetTitleAction |
  TitleTranslatedAction;
