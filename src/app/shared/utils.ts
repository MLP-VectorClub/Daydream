import { GUIDE_NAMES } from 'app/app.config';
import { GuideName } from 'app/types';
import { range as _range, trim } from 'lodash-es';

export const sanitizeGuideName = (value: string): GuideName => {
  if (GUIDE_NAMES.includes(value as GuideName))
    return value as GuideName;
  return GUIDE_NAMES[0];
};
export const sanitizePageParam = (value: string) => {
  const page = parseInt(value, 10);
  if (isNaN(page) || page < 1)
    return 1;
  return page;
};
export const sanitizePageSizeParam = (values: number[]) => (value: string) => {
  const size = parseInt(value, 10);
  if (!values.includes(size))
    return values[0];
  return size;
};
export const sanitizeSearchParam = (value?: string): string => {
  if (typeof value !== 'string')
    return '';
  return value.trim();
};

export const makeUrlSafe = (input: string): string => {
  return trim(input.replace(/[^A-Za-z\d\-]/g, '-').replace(/-+/g, '-'), '-');
};

/**
 * Clear way to make sure the first page does not show as a query param in the URL
 */
export const paginationParam = (page: number): number | undefined =>
  page === 1 ? undefined : page;

export const range = (start: number, end: number, step = 1): number[] => _range(start, end + step, step);
