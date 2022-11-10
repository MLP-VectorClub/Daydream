import { GetUsersMeResult, User, ValidationErrorResponse } from '@mlp-vectorclub/api-types';
import { TFunction } from 'next-i18next';

export enum Status {
  INIT,
  LOAD,
  SUCCESS,
  FAILURE,
}

export type Nullable<T> = T | null;
/** Allows making all or a selected subset of properties of an object nullable */
export type NullableProps<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]: Nullable<T[P]>;
};
export type Optional<T> = T | undefined | void;
export type OptionalProps<T, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/** Can be used in place of `number` to avoid having to do explicit type casting */
export type Numeric = number | string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ValuesOf<T extends any[] | readonly any[]> = T[number];

export interface ObjectOf<T> {
  [key: string]: T;
}

export interface PusherEnv {
  key: string;
  cluster: string;
}

export interface Environment {
  production: boolean;
  backendDomain: string;
  pusher: PusherEnv;
}

export interface PaginationItem {
  label: string;
  queryParams?: ObjectOf<string>;
  pageNumber: Nullable<number>;
}

export interface BreadcrumbItem {
  label: Nullable<string>;
  url: Nullable<string>;
  current?: boolean;
}

export enum UnifiedErrorResponseTypes {
  UNKNOWN = 'UNKNOWN',
  MESSAGE_ONLY = 'MESSAGE_ONLY',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  MISSING_CSRF_TOKEN = 'MISSING_CSRF_TOKEN',
  RATE_LIMITED = 'RATE_LIMITED',
  BACKEND_DOWN = 'BACKEND_DOWN',
}

export type UnifiedErrorResponse =
  | {
      type: UnifiedErrorResponseTypes.AUTHENTICATION_ERROR;
    }
  | {
      type: UnifiedErrorResponseTypes.RATE_LIMITED;
      /** Seconds until another request can be sent */
      retryAfter: number;
    }
  | {
      type: UnifiedErrorResponseTypes.MISSING_CSRF_TOKEN;
    }
  | {
      type: UnifiedErrorResponseTypes.UNKNOWN;
      payload: string;
    }
  | {
      type: UnifiedErrorResponseTypes.BACKEND_DOWN;
      message: string | null;
    }
  | {
      type: UnifiedErrorResponseTypes.MESSAGE_ONLY;
      message: string;
    }
  | ({
      type: UnifiedErrorResponseTypes.VALIDATION_ERROR;
    } & ValidationErrorResponse);

export type FailsafeUser = GetUsersMeResult | (NullableProps<Omit<User, 'id'>, 'name' | 'avatarUrl' | 'email' | 'role'> & { id: null });

type TFuncParams = Parameters<TFunction>;
export type Translatable = [TFuncParams[0]] | [TFuncParams[0], Exclude<TFuncParams[2], string | undefined>];

export type PageTitle = Nullable<string> | Translatable;

export const isValidationErrorResponse = (value: unknown): value is { response: { data: ValidationErrorResponse } } => {
  return typeof value === 'object' && value !== null && 'response' in value;
};
