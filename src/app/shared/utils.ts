import { GUIDE_NAMES } from 'app/app.config';
import { GuideName } from 'app/types';
import { trim } from 'lodash';

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
export const sanitizeSearchParam = (value?: string) => {
  if (typeof value !== 'string')
    return '';
  return value.trim();
};

export const makeUrlSafe = (input: string): string => {
  return trim(input.replace(/[^A-Za-z\d\-]/g, '-').replace(/-+/g, '-'), '-');
};
