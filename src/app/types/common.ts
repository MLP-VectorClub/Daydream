import { ValidationErrorResponse } from 'app/types/api';

export type Nullable<T> = T | null;
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

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
