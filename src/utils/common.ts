import { get, range as _range } from 'lodash';
import { AxiosError } from 'axios';
import { UnifiedErrorResponse, UnifiedErrorResponseTypes, ValidationErrorResponse } from 'src/types';
import { PROD_APP_URL } from 'src/config';

export const sanitizePageParam = (value: string) => {
  const page = parseInt(value, 10);
  if (isNaN(page) || page < 1) return 1;
  return page;
};
export const sanitizePageSizeParam = (values: number[]) => (value: string) => {
  const size = parseInt(value, 10);
  if (!values.includes(size)) return values[0];
  return size;
};
export const sanitizeSearchParam = (value?: string): string => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

/**
 * Clear way to make sure the first page does not show as a query param in the URL
 */
export const paginationParam = (page: number): number | undefined =>
  (page === 1 ? undefined : page);

export const range = (start: number, end: number, step = 1): number[] =>
  _range(start, end + step, step);

export const httpResponseMapper = (err: AxiosError): UnifiedErrorResponse => {
  switch (err.response?.status) {
    case 503: {
      const message = get(err, 'response.data.message');
      return { type: UnifiedErrorResponseTypes.BACKEND_DOWN, message };
    }
    case 419:
      return { type: UnifiedErrorResponseTypes.MISSING_CSRF_TOKEN };
    case 401:
      return { type: UnifiedErrorResponseTypes.AUTHENTICATION_ERROR };
    case 422: {
      const body = err.response.data as ValidationErrorResponse;
      return {
        type: UnifiedErrorResponseTypes.VALIDATION_ERROR,
        ...body,
      };
    }
    case 429: {
      const retryAfter = Number(err.response?.headers['retry-after']);
      return {
        type: UnifiedErrorResponseTypes.RATE_LIMITED,
        retryAfter,
      };
    }
    default: {
      const message = get(err, 'response.data.message');
      console.error(err);
      if (message) {
        return {
          type: UnifiedErrorResponseTypes.MESSAGE_ONLY,
          message,
        };
      }
      return {
        type: UnifiedErrorResponseTypes.UNKNOWN,
        payload: JSON.stringify(err, null, 2),
      };
    }
  }
};

export const assembleSeoUrl = (host?: string, pathname?: string): string =>
  `${host ? `https://${host}` : PROD_APP_URL}${pathname}`;

export const isClientSide = typeof window !== 'undefined';
