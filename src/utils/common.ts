import { get, range as _range, trim } from 'lodash';
import { AxiosError } from 'axios';
import { UnifiedErrorResponse, UnifiedErrorResponseTypes, ValidationErrorResponse } from '../types';
import { PROD_APP_URL } from '../config';

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

export const makeUrlSafe = (input: string): string => trim(input.replace(/[^A-Za-z\d-]/g, '-').replace(/-+/g, '-'), '-');

/**
 * Clear way to make sure the first page does not show as a query param in the URL
 */
export const paginationParam = (page: number): number | undefined =>
  (page === 1 ? undefined : page);

export const range = (start: number, end: number, step = 1): number[] =>
  _range(start, end + step, step);

export const httpResponseMapper = (err: AxiosError): UnifiedErrorResponse => {
  switch (err.response?.status) {
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
