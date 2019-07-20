import { GUIDE_NAMES } from 'app/app.config';
import { GuideName } from 'app/types';
import { trim } from 'lodash';
import { pipe } from 'rxjs';
import { filter } from 'rxjs/operators';

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

/** RxJS operator */
export const skipFirstIf = (condition: () => boolean) =>
  pipe(filter((val, index) => {
    return condition() ? index > 1 : true;
  }));
