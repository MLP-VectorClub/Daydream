import { FieldValues, FormProps } from 'react-hook-form';
import { GetUsersMeResult, User, ValidationErrorResponse } from 'src/types/api';

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
export type Optional<T> = T | undefined;
export type OptionalProps<T, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/** Can be used in place of `number` to avoid having to do explicit type casting */
export type Numeric = number | string;
export type ValuesOf<T> = T[keyof T];

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
  UNKNOWN = 'UNKNOWN',
  MESSAGE_ONLY = 'MESSAGE_ONLY',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  MISSING_CSRF_TOKEN = 'MISSING_CSRF_TOKEN',
  RATE_LIMITED = 'RATE_LIMITED',
  BACKEND_DOWN = 'BACKEND_DOWN',
}

export type UnifiedErrorResponse = {
  type: UnifiedErrorResponseTypes.AUTHENTICATION_ERROR;
} | {
  type: UnifiedErrorResponseTypes.RATE_LIMITED;
  /** Seconds until another request can be sent */
  retryAfter: number;
} | {
  type: UnifiedErrorResponseTypes.MISSING_CSRF_TOKEN;
} | {
  type: UnifiedErrorResponseTypes.UNKNOWN;
  payload: string;
} | {
  type: UnifiedErrorResponseTypes.BACKEND_DOWN;
  message: string;
} | {
  type: UnifiedErrorResponseTypes.MESSAGE_ONLY;
  message: string;
} | ({
  type: UnifiedErrorResponseTypes.VALIDATION_ERROR;
} & ValidationErrorResponse);

export type FailsafeUser = GetUsersMeResult | (NullableProps<Omit<User, 'id'>, 'name' | 'avatarUrl' | 'email' | 'role'> & { id: null });

export type PageTitle = Nullable<string>;

export type FormSubmitHandler<T = FieldValues> = Parameters<FormProps<T>['handleSubmit']>[0];
