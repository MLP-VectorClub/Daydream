import { TFunction } from 'next-i18next';
import { User, ValidationErrorResponse } from './api';

export enum Status {
  INIT,
  LOAD,
  SUCCESS,
  FAILURE
}

declare global {
  interface Window {
    __NEXT_DATA__: {
      buildId: string;
      customServer: boolean;
      isFallback: boolean;
      page: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      props: Record<string, any>;
      query: Record<string, string>;
    };
  }
}

export type Nullable<T> = T | null;
/** Allows making all or a selected subset of properties of an object nullable */
export type NullableProps<T, K extends keyof T = keyof T> = Omit<T, K> & {
  [P in K]: Nullable<T[P]>;
};
/** Can be used in place of `number` to avoid having to do explicit type casting */
export type Numeric = number | string;
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type ValuesOf<T> = T[keyof T];

export interface WithTFunction {
  t: TFunction;
}

export interface ObjectOf<T> {
  [key: string]: T;
}

export interface Environment {
  production: boolean;
  backendDomain: string;
  pusher: PusherEnv;
}

export interface PusherEnv {
  key: string;
  cluster: string;
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
  UNKNOWN,
  MESSAGE_ONLY,
  VALIDATION_ERROR,
  AUTHENTICATION_ERROR,
}

export type UnifiedErrorResponse = {
  type: UnifiedErrorResponseTypes.AUTHENTICATION_ERROR;
} | {
  type: UnifiedErrorResponseTypes.UNKNOWN;
  payload: string;
} | {
  type: UnifiedErrorResponseTypes.MESSAGE_ONLY;
  message: string;
} | ({
  type: UnifiedErrorResponseTypes.VALIDATION_ERROR;
} & ValidationErrorResponse);

export type FailsafeUser = NullableProps<User, 'id' | 'name' | 'avatarUrl' | 'displayName' | 'email'>;

type TitleKeyWithParams = [string | number, Record<string, string>];
export type PageTitle = Nullable<string | number> | TitleKeyWithParams;
